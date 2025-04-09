'use client';

import { useEffect, useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import BalanceHistory from './BalanceHistory';

const GET_USDC_BALANCE = gql`
  query GetUsdcBalance($address: String!) {
    getUsdcBalance(address: $address)
  }
`;

type HistoryItem = {
  address: string;
  balance: string;
  timestamp: string;
};

export default function BalanceForm() {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [errorMmssage, setErrorMmssage] = useState('');
  const [history, setHistory] = useState<HistoryItem[] | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== 'undefined') setHistory(JSON.parse(localStorage.getItem('usageHistory') ?? '[]'));
  }, []);

  useEffect(() => {
    if (history) localStorage.setItem('usageHistory', JSON.stringify(history));
  }, [history]);

  const [fetchBalance, { loading }] = useLazyQuery(GET_USDC_BALANCE, {
    onCompleted: (data) => {
      setBalance(data.getUsdcBalance);
      setErrorMmssage('');
      setHistory((prev) => [{ address, balance: data.getUsdcBalance, timestamp: new Date().toLocaleString() }, ...(prev ?? [])]);
    },
    onError: (error) => {
      setErrorMmssage(error.message);
      setBalance('');
    }
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!address.startsWith('0x') || address.length !== 42) {
      setErrorMmssage('Please enter a valid Ethereum address.');
      return;
    }

    fetchBalance({ variables: { address } });
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('usageHistory');
  };

  return (
    <div className="mx-auto max-w-md">
      <form onSubmit={handleSubmit} className="flex gap-5">
        <Input
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={(event) => {
            const value = (event.target as HTMLInputElement).value;
            if (!value) {
              setBalance('');
              setErrorMmssage('');
            }
            setAddress(value);
          }}
          className={`w-full ${errorMmssage ? 'border-red-500 ring-red-500' : ''}`}
          aria-invalid={!!errorMmssage}
          aria-describedby={errorMmssage ? 'address-error' : undefined}
        />
        <Button
          type="submit"
          disabled={loading || !address}
          className="cursor-pointer disabled:cursor-not-allowed"
        >
          Check
        </Button>
      </form>
      {
        errorMmssage &&
        <p
          id="address-error"
          role="alert"
          className="ml-4 mt-1 text-xs text-red-600"
        >
          {errorMmssage}
        </p>
      }
      {
        !loading && !errorMmssage && balance &&
        <div className="ml-2 mt-4 flex items-end">
          <h2 className="mr-2 text-lg font-semibold">
            USDC Balance:
          </h2>
          <p className={`mb-[1px] + ${Number(balance) > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {balance}
          </p>
        </div>
      }
      {
        history && history.length != 0 &&
        <>
          <div className="mb-2 ml-5 mt-10 flex items-center justify-between">
            <h3 className="font-semibold">
              History:
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearHistory}
              className="text-red-600 hover:text-red-600"
            >
              X
            </Button>
          </div>
          <BalanceHistory history={history} />
        </>
      }
    </div>
  );
}