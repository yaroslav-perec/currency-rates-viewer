import { useMemo } from 'react';
import {
	Box,
	Chip,
	Stack,
	Typography,
	Autocomplete,
	TextField,
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

	const available = useMemo(() => {
		if (!list) return [];
		return Object.keys(list)
			.filter((c) => c !== base && !compared.includes(c))
			.map((c) => c.toUpperCase())
			.sort();
	}, [list, base, compared]);

	return (
		<Stack spacing={1}>
			{/* ---------- Add Currency ---------- */}
			<Typography
				variant="subtitle2"
				sx={{ mb: 0.5, color: 'text.secondary', fontWeight: 500 }}
			>
				Add currency
			</Typography>

			<Autocomplete
				size="small"
				options={available}
				disabled={compared.length >= MAX}
				renderInput={(params) => (
					<TextField {...params} placeholder="Search..." />
				)}
				onChange={(_, value) => {
					if (value) dispatch(addCompared(value.toLowerCase()));
				}}
				blurOnSelect
				clearOnEscape
			/>

			{/* ---------- Compared Currencies Section ---------- */}
			<Box
				sx={{
					borderTop: '1px solid #eee',
					mt: 1.5,
					pt: 1.5,
				}}
			>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					sx={{ mb: 1 }}
				>
					<Typography
						variant="subtitle2"
						sx={{
							color: 'text.secondary',
							fontWeight: 600,
						}}
					>
						Compared currencies
					</Typography>

					<Chip
						size="small"
						label={`${compared.length}/${MAX}`}
						color={compared.length >= MAX ? 'error' : 'default'}
						sx={{
							fontWeight: 600,
							height: 22,
							backgroundColor:
								compared.length >= MAX ? '#ffebee' : '#f5f5f5',
						}}
					/>
				</Stack>

				<Box
					sx={{
						display: 'flex',
						gap: 1,
						flexWrap: 'wrap',
					}}
				>
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
			</Box>
		</Stack>
	);
}
