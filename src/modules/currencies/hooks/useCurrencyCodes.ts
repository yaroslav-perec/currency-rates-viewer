import { useMemo } from 'react';
import { useGetCurrenciesListQuery } from '../api/currencyApi';

export function useCurrencyCodes() {
	const { data: list, isLoading, isError, error } = useGetCurrenciesListQuery();

	const codes = useMemo(() => {
		if (!list) return [];
		return Object.keys(list)
			.map((c) => c.toUpperCase())
			.sort();
	}, [list]);

	return { codes, isLoading, isError, error };
}
