import { useMemo } from 'react';
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	type SelectChangeEvent,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setBase } from '../features/currencies/currenciesSlice';
import { useGetCurrenciesListQuery } from '../services/currencyApi';

export default function BaseCurrencySelect() {
	const dispatch = useAppDispatch();
	const base = useAppSelector((s) => s.currencies.base);
	const { data: list } = useGetCurrenciesListQuery();

	const codes = useMemo(() => (list ? Object.keys(list).sort() : []), [list]);

	const onChange = (e: SelectChangeEvent<string>) => {
		dispatch(setBase(e.target.value));
	};

	return (
		<FormControl fullWidth size="small">
			<InputLabel id="base-currency-label">Base currency</InputLabel>
			<Select
				labelId="base-currency-label"
				label="Base currency"
				value={base}
				onChange={onChange}
			>
				{codes.map((c) => (
					<MenuItem key={c} value={c}>
						{c.toUpperCase()}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
