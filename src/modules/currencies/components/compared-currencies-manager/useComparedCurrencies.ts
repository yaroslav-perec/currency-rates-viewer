import { useMemo } from 'react';
import { useAppSelector } from 'shared/hooks/hooks';
import { useGetCurrenciesListQuery } from '../../api/currencyApi';

export function useComparedCurrencies() {
	const base = useAppSelector((s) => s.currencies.base);
	const compared = useAppSelector((s) => s.currencies.compared);
	const { data: list } = useGetCurrenciesListQuery();

	const available = useMemo(() => {
		if (!list) return [];
		return Object.keys(list)
			.filter((c) => c !== base && !compared.includes(c))
			.map((c) => c.toUpperCase())
			.sort();
	}, [list, base, compared]);

	return { compared, available };
}
