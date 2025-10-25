import { Autocomplete, TextField, autocompleteClasses } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { setBase } from '../currenciesSlice';
import { useCurrencyCodes } from '../hooks/useCurrencyCodes';

export function BaseCurrencySelect() {
	const dispatch = useAppDispatch();
	const base = useAppSelector((s) => s.currencies.base);
	const { codes, isLoading } = useCurrencyCodes();

	const selectedValue = codes.includes(base.toUpperCase())
		? base.toUpperCase()
		: '';

	const handleChange = (_: unknown, value: string | null) => {
		if (value) dispatch(setBase(value.toLowerCase()));
	};

	return (
		<Autocomplete
			size="small"
			disableClearable
			options={codes}
			value={selectedValue}
			onChange={handleChange}
			loading={isLoading}
			loadingText="Loading currencies..."
			renderInput={(params) => (
				<TextField
					{...params}
					placeholder="Select base currency"
				/>
			)}
			sx={{
				minWidth: 180,
				borderRadius: 1,
				[`& .${autocompleteClasses.input}`]: {
					fontWeight: 500,
					color: 'text.primary',
				},
			}}
		/>
	);
}
