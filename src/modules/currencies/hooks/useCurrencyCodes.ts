import { useMemo } from 'react';
import type { ApiError } from 'src/shared/types/api';
import { useGetCurrenciesListQuery } from '../api/currencyApi';

export function useCurrencyCodes(): {
  codes: string[];
  isLoading: boolean;
  isError: boolean;
  error?: ApiError;
} {
  const { data: list, isLoading, isError, error } = useGetCurrenciesListQuery();

  const codes = useMemo(() => {
    if (!list) return [];
    return Object.keys(list)
      .map((c) => c.toUpperCase())
      .sort();
  }, [list]);

  return { codes, isLoading, isError, error };
}
