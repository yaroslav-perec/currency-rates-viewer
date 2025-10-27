import { useMemo, useState } from 'react';
import type { Order } from './types';

export function useTableSort<T extends Record<string, string | number>>(
  rows: T[],
  defaultKey = 'date',
) {
  const [orderBy, setOrderBy] = useState<string>(defaultKey);
  const [order, setOrder] = useState<Order>('desc');

  const handleSort = (key: string) => {
    setOrder((prevOrder) => {
      if (orderBy === key) {
        // Toggle direction if sorting the same column
        return prevOrder === 'asc' ? 'desc' : 'asc';
      }
      // Reset to ascending when sorting a new column
      return 'asc';
    });
    setOrderBy(key);
  };

  const sortedRows = useMemo(() => {
    const sorted = [...rows];
    sorted.sort((a, b) => {
      const av = a[orderBy];
      const bv = b[orderBy];

      if (typeof av === 'string' && typeof bv === 'string') {
        return order === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      }

      if (typeof av === 'number' && typeof bv === 'number') {
        return order === 'asc' ? av - bv : bv - av;
      }

      return 0;
    });
    return sorted;
  }, [rows, orderBy, order]);

  return { order, orderBy, handleSort, sortedRows };
}
