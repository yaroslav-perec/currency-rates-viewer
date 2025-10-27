import { last7DaysFrom } from 'src/shared/utils/date';
import type { TableRateRow } from 'src/modules/currencies/components/currency-table/types';
import type { ApiError } from 'src/shared/types/api';
import { useGetRatesByDateAndBaseQuery } from '../api/currencyApi';

export function useRatesForLast7Days(
  selectedDate: string,
  base: string,
): {
  data: TableRateRow[];
  loading: boolean;
  error?: ApiError;
} {
  const days = last7DaysFrom(selectedDate);

  // Call hooks individually — static list length ensures hook order stability
  const queries = [
    useGetRatesByDateAndBaseQuery({ date: days[0], base }),
    useGetRatesByDateAndBaseQuery({ date: days[1], base }),
    useGetRatesByDateAndBaseQuery({ date: days[2], base }),
    useGetRatesByDateAndBaseQuery({ date: days[3], base }),
    useGetRatesByDateAndBaseQuery({ date: days[4], base }),
    useGetRatesByDateAndBaseQuery({ date: days[5], base }),
    useGetRatesByDateAndBaseQuery({ date: days[6], base }),
  ];

  const loading = queries.some((q) => q.isFetching);
  const error = queries.find((q) => q.error)?.error;

  const data: TableRateRow[] = queries
    .map((q) => q.data)
    .filter((d): d is NonNullable<(typeof queries)[number]['data']> => Boolean(d))
    .map((d) => {
      const rates = typeof d.rates === 'object' && d.rates !== null ? d.rates : {};
      return {
        date: d.date,
        rates,
      };
    });

  return { data, loading, error };
}
