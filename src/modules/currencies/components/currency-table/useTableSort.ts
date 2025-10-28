import { useMemo, useState } from 'react';
import type { SortOrder } from 'src/shared/types/sort';
import type { TableRateRow } from '../../types/table';
import { DEFAULT_SORT_KEY } from '../../constants';

export function useTableSort(rows: TableRateRow[], defaultKey = DEFAULT_SORT_KEY) {
  const [orderBy, setOrderBy] = useState<string>(defaultKey);
  const [order, setOrder] = useState<SortOrder>('desc');

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

  const sortedRows: TableRateRow[] = useMemo(() => {
    const sorted = [...rows];

    sorted.sort((a, b) => {
      if (orderBy === DEFAULT_SORT_KEY) {
        const aDate = new Date(a.date).getTime();
        const bDate = new Date(b.date).getTime();
        return order === 'asc' ? aDate - bDate : bDate - aDate;
      }

      const av = a.rates[orderBy];
      const bv = b.rates[orderBy];

      if (av == null || bv == null) return 0;
      return order === 'asc' ? av - bv : bv - av;
    });

    return sorted;
  }, [rows, orderBy, order]);

  return { order, orderBy, handleSort, sortedRows };
}
