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
import { Fragment, useMemo, useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { useRatesForLast7Days } from '../hooks/useRatesForLast7Days';

type Order = 'asc' | 'desc';

export interface RateRow {
	date: string;
	[key: string]: string | number;
}

function formatRate(n?: number) {
	if (n == null || Number.isNaN(n)) return '—';
	return n.toFixed(4);
}

export default function CurrencyTable({ selectedDate }: { selectedDate: string }) {
	const base = useAppSelector((s) => s.currencies.base);
	const compared = useAppSelector((s) => s.currencies.compared);

	const { data: rows, loading, error } = useRatesForLast7Days(selectedDate, base) as {
		data: RateRow[];
		loading: boolean;
		error: Error;
	};

	const [orderBy, setOrderBy] = useState<string>('date');
	const [order, setOrder] = useState<Order>('desc');

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

			<TableContainer
				component={Paper}
				sx={{
					maxHeight: { xs: 'none', sm: 400 },
					overflowX: 'auto',
					overflowY: { xs: 'visible', sm: 'auto' },
					borderRadius: 2,
				}}
			>
				<Table size="small" stickyHeader sx={{ minWidth: 700 }}>
					{/* ---------- HEADER ---------- */}
					<TableHead sx={{ bgcolor: 'grey.100' }}>
						<TableRow>
							<TableCell
								sx={{
									position: 'sticky',
									left: 0,
									zIndex: 3,
									backgroundColor: 'grey.100',
								}}
								sortDirection={orderBy === 'date' ? order : false}
							>
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

					{/* ---------- BODY ---------- */}
					<TableBody>
						{loading && (
							<TableRow>
								<TableCell colSpan={compared.length + 1}>
									<LinearProgress color="primary" sx={{ my: 2 }} />
								</TableCell>
							</TableRow>
						)}

						{error && (
							<TableRow>
								<TableCell colSpan={compared.length + 1}>
									<Alert severity="error">Failed to load exchange rates</Alert>
								</TableCell>
							</TableRow>
						)}

						{!loading &&
							!error &&
							sortedRows.map((row) => (
								<TableRow key={row.date}>
									<TableCell
										sx={{
											position: 'sticky',
											left: 0,
											zIndex: 2,
											backgroundColor: 'background.paper',
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
