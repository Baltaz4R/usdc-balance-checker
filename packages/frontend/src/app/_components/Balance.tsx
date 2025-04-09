'use client';

import { ApolloProvider } from '@apollo/client';
import client from '@/lib/apollo-client';

import BalanceForm from './BalanceForm';

export default function BalanceFormWrapper() {
  return (
    <ApolloProvider client={client}>
      <BalanceForm />
    </ApolloProvider>
  );
}