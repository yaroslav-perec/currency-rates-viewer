import { useMemo, useState } from 'react';
import {
	Box,
	Chip,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	type SelectChangeEvent,
	Stack,
	Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
	addCompared,
	removeCompared,
} from '../features/currencies/currenciesSlice';
import { useGetCurrenciesListQuery } from '../services/currencyApi';

const MIN = 3;
const MAX = 7;

export default function ComparedCurrenciesManager() {
	const dispatch = useAppDispatch();
	const base = useAppSelector((s) => s.currencies.base);
	const compared = useAppSelector((s) => s.currencies.compared);
	const { data: list } = useGetCurrenciesListQuery();
	const [candidate, setCandidate] = useState('');

	const available = useMemo(() => {
		if (!list) return [];
		return Object.keys(list)
			.filter((c) => c !== base && !compared.includes(c))
			.sort();
	}, [list, base, compared]);

	const onAdd = (e: SelectChangeEvent<string>) => {
		const v = e.target.value;
		setCandidate(v);
		if (v) dispatch(addCompared(v));
	};

	return (
		<Stack spacing={1}>
			<Typography variant="subtitle2">
				Compared currencies ({compared.length}/{MAX})
			</Typography>
			<Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
				{compared.map((code) => (
					<Chip
						key={code}
						label={code.toUpperCase()}
						onDelete={
							compared.length > MIN
								? () => dispatch(removeCompared(code))
								: undefined
						}
						color="primary"
						variant="outlined"
					/>
				))}
			</Box>
			<FormControl
				size="small"
				disabled={compared.length >= MAX || available.length === 0}
			>
				<InputLabel id="add-currency-label">Add currency</InputLabel>
				<Select
					labelId="add-currency-label"
					value={candidate}
					label="Add currency"
					onChange={onAdd}
				>
					{available.map((c) => (
						<MenuItem key={c} value={c}>
							{c.toUpperCase()}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Stack>
	);
}
