import { useMemo } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setBase } from '../features/currencies/currenciesSlice';
import { useGetCurrenciesListQuery } from '../api/currencyApi';

export default function BaseCurrencySelect() {
	const dispatch = useAppDispatch();
	const base = useAppSelector((s) => s.currencies.base);
	const { data: list } = useGetCurrenciesListQuery();

	const codes = useMemo(() => {
		if (!list) return [];
		return Object.keys(list).map((c) => c.toUpperCase()).sort();
	}, [list]);

	return (
		<Autocomplete
			size="small"
			color="secondary"
			disableClearable
			options={codes}
			value={base.toUpperCase()}
			onChange={(_, value) => dispatch(setBase(value.toLowerCase()))}
			renderInput={(params) => (
				<TextField {...params} placeholder="Search..." />
			)}
		/>
	);
}
