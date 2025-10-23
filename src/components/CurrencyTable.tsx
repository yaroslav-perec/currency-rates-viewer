import {
	Alert,
	LinearProgress,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { Fragment, useMemo } from 'react';
import { useAppSelector } from '../app/hooks';
import { last7DaysFrom } from '../utils/date';
import { useGetRatesByDateAndBaseQuery } from '../services/currencyApi';

function formatRate(n?: number) {
	if (n == null || Number.isNaN(n)) return '—';
	return n.toFixed(4);
}

function DayRow({ date, base, compared }: {
	date: string;
	base: string;
	compared: string[];
}) {
	const { data, isFetching, isError } = useGetRatesByDateAndBaseQuery({
		date,
		base,
	});

	if (isFetching && !data)
		return (
			<TableRow>
				<TableCell colSpan={compared.length + 1}>
					<LinearProgress />
				</TableCell>
			</TableRow>
		);

	if (isError)
		return (
			<TableRow>
				<TableCell colSpan={compared.length + 1}>
					<Alert severity="error">Failed to load rates for {date}</Alert>
				</TableCell>
			</TableRow>
		);

	return (
		<TableRow>
			<TableCell>{date}</TableCell>
			{compared.map((c) => (
				<TableCell key={c}>{formatRate(data?.rates[c])}</TableCell>
			))}
		</TableRow>
	);
}

export default function CurrencyTable({ selectedDate }: { selectedDate: string }) {
	const base = useAppSelector((s) => s.currencies.base);
	const compared = useAppSelector((s) => s.currencies.compared);
	const days = useMemo(() => last7DaysFrom(selectedDate), [selectedDate]);

	return (
		<Fragment>
			<Typography variant="subtitle2" sx={{ mb: 1 }}>
				Showing {base.toUpperCase()} against{' '}
				{compared.map((c) => c.toUpperCase()).join(', ')}
			</Typography>
			<TableContainer component={Paper}>
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell>Date</TableCell>
							{compared.map((c) => (
								<TableCell key={c}>{c.toUpperCase()}</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{days.map((d) => (
							<DayRow key={d} date={d} base={base} compared={compared} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Fragment>
	);
}
