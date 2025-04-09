'use client';

import { useState } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';

type HistoryItem = {
  address: string;
  balance: string;
  timestamp: string;
};

type Props = {
  history: HistoryItem[];
};

export default function BalanceHistory({ history }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 10;
  const totalPages = Math.ceil(history.length / perPage);
  const paginatedHistory = history.slice((currentPage - 1) * perPage, currentPage * perPage);

  if (!history.length) return null;

  return (
    <div className="mx-8">
      <ul className="space-y-2 text-xs">
        {paginatedHistory.map((item, idx) =>
          <li key={idx}>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <span className="font-medium">
                  {item.address}
                  <span className="ml-3">
                    &rarr;
                  </span>
                </span>
                <span className="text-muted-foreground">
                  {item.balance}
                </span>
              </div>
              <span className="text-muted-foreground text-[10px]">
                {item.timestamp}
              </span>
            </div>
          </li>
        )}
      </ul>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
          <PaginationItem className="text-muted-foreground flex items-center p-1 pt-0.5 text-xs">
            Page {currentPage} of {totalPages}
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}