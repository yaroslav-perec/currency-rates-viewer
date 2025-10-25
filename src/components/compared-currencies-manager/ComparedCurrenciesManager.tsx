import { Stack, Typography, Autocomplete, TextField } from '@mui/material';
import { addCompared, removeCompared } from '../../features/currencies/currenciesSlice';
import { useAppDispatch } from '../../app/hooks.ts';
import { MAX_COMPARED_CURRENCIES, MIN_COMPARED_CURRENCIES } from '../../features/currencies/constants';
import { useComparedCurrencies } from './useComparedCurrencies';
import { ComparedCurrenciesList } from './ComparedCurrenciesList';

export default function ComparedCurrenciesManager() {
	const dispatch = useAppDispatch();
	const { compared, available } = useComparedCurrencies();

	const handleAddCurrency = (_: unknown, value: string | null) => {
		if (value) {
			dispatch(addCompared(value.toLowerCase()));
		}
	};

	const handleDelete = (code: string) => {
		dispatch(removeCompared(code));
	};

	return (
		<Stack spacing={1}>
			<Typography
				variant="subtitle2"
				sx={{ mb: 0.5, color: 'text.secondary', fontWeight: 500 }}
			>
				Add currency
			</Typography>

			<Autocomplete
				size="small"
				options={available}
				disabled={compared.length >= MAX_COMPARED_CURRENCIES}
				renderInput={(params) => (
					<TextField {...params} placeholder="Search..." />
				)}
				onChange={handleAddCurrency}
				blurOnSelect
				clearOnEscape
			/>

			<ComparedCurrenciesList
				compared={compared}
				min={MIN_COMPARED_CURRENCIES}
				max={MAX_COMPARED_CURRENCIES}
				onDelete={handleDelete}
			/>
		</Stack>
	);
}
