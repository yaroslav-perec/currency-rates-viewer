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
	TableSortLabel,
	Typography,
} from '@mui/material';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { last7DaysFrom } from '../utils/date';

type Order = 'asc' | 'desc';

function formatRate(n?: number) {
	if (n == null || Number.isNaN(n)) return '—';
	return n.toFixed(4);
}

interface RateRow {
	date: string;
	[key: string]: number | string;
}

export default function CurrencyTable({ selectedDate }: { selectedDate: string }) {
	const base = useAppSelector((s) => s.currencies.base);
	const compared = useAppSelector((s) => s.currencies.compared);
	const days = useMemo(() => last7DaysFrom(selectedDate), [selectedDate]);

	const [rows, setRows] = useState<RateRow[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const [orderBy, setOrderBy] = useState<string>('date');
	const [order, setOrder] = useState<Order>('desc');

	useEffect(() => {
		let isCancelled = false;

		async function fetchRates() {
			setLoading(true);
			setError(null);

			try {
				const results = await Promise.all(
					days.map(async (d) => {
						const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${d}/v1/currencies/${base}.json`;
						const res = await fetch(url);
						const json = await res.json();
						return { date: d, ...json[base] };
					})
				);
				if (!isCancelled) setRows(results);
			} catch {
				if (!isCancelled) setError('Failed to load exchange rates');
			} finally {
				if (!isCancelled) setLoading(false);
			}
		}

		fetchRates();
		return () => {
			isCancelled = true;
		};
	}, [base, days]);

	/* ---------------- Sorting ---------------- */
	const sortedRows = useMemo(() => {
		const sorted = [...rows];
		sorted.sort((a, b) => {
			const av = a[orderBy];
			const bv = b[orderBy];
			if (typeof av === 'string' && typeof bv === 'string') {
				return order === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
			}
			if (typeof av === 'number' && typeof bv === 'number') {
				return order === 'asc' ? av - bv : bv - av;
			}
			return 0;
		});
		return sorted;
	}, [rows, orderBy, order]);

	const handleSort = (key: string) => {
		if (orderBy === key) {
			setOrder(order === 'asc' ? 'desc' : 'asc');
		} else {
			setOrderBy(key);
			setOrder('asc');
		}
	};

	return (
		<Fragment>
			<Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
				Showing {base.toUpperCase()} against{' '}
				{compared.map((c) => c.toUpperCase()).join(', ')}
			</Typography>

			<TableContainer component={Paper}>
				<Table size="small">
					<TableHead sx={{ bgcolor: 'grey.100' }}>
						<TableRow>
							<TableCell sortDirection={orderBy === 'date' ? order : false}>
								<TableSortLabel
									active={orderBy === 'date'}
									direction={orderBy === 'date' ? order : 'asc'}
									onClick={() => handleSort('date')}
								>
									Date
								</TableSortLabel>
							</TableCell>
							{compared.map((c) => (
								<TableCell
									key={c}
									align="right"
									sortDirection={orderBy === c ? order : false}
								>
									<TableSortLabel
										active={orderBy === c}
										direction={orderBy === c ? order : 'asc'}
										onClick={() => handleSort(c)}
									>
										{c.toUpperCase()}
									</TableSortLabel>
								</TableCell>
							))}
						</TableRow>
					</TableHead>

					<TableBody>
						{loading && (
							<TableRow>
								<TableCell
									colSpan={compared.length + 1}
									sx={{ py: 3, px: 2, bgcolor: 'background.paper' }}
								>
									<LinearProgress color="primary" variant="indeterminate" />
									<Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
										Loading latest exchange rates...
									</Typography>
								</TableCell>
							</TableRow>
						)}

						{error && (
							<TableRow>
								<TableCell colSpan={compared.length + 1}>
									<Alert severity="error">{error}</Alert>
								</TableCell>
							</TableRow>
						)}
						{!loading &&
							!error &&
							sortedRows.map((row, idx) => (
								<TableRow
									key={row.date as string}
									sx={{
										bgcolor: idx % 2 === 0 ? 'grey.50' : 'background.paper',
										transition: 'background-color 0.2s ease',
										'&:hover': { bgcolor: 'grey.100' },
									}}
								>
									<TableCell
										sx={{
											fontWeight: orderBy === 'date' ? 600 : 400,
											color: orderBy === 'date' ? 'primary.main' : 'inherit',
										}}
									>
										{row.date}
									</TableCell>
									{compared.map((c) => (
										<TableCell
											key={c}
											align="right"
											sx={{
												fontWeight: orderBy === c ? 600 : 400,
												color: orderBy === c ? 'primary.main' : 'inherit',
											}}
										>
											{formatRate(row[c] as number)}
										</TableCell>
									))}
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</Fragment>
	);
}
