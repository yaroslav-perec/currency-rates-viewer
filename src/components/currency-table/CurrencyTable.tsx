import { Box, Paper, Table, TableContainer } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { useRatesForLast7Days } from '../../features/currencies/useRatesForLast7Days';
import { useTableSort } from './useTableSort';
import { CurrencyTableHeader } from './CurrencyTableHeader';
import { CurrencyTableBody } from './CurrencyTableBody';
import { CurrencyTableStateBanner } from './CurrencyTableStateBanner';
import type { TableRateRow } from './types';

interface Props {
	selectedDate: string;
}

export function CurrencyTable({ selectedDate }: Props) {
	const base = useAppSelector((s) => s.currencies.base);
	const compared = useAppSelector((s) => s.currencies.compared);

	const { data: rows = [], loading, error } = useRatesForLast7Days(selectedDate, base) as {
		data: TableRateRow[];
		loading: boolean;
		error: Error | null;
	};

	const { order, orderBy, handleSort, sortedRows } = useTableSort(rows);
	const showData = !loading && !error && sortedRows.length > 0;

	return (
		<Box sx={{ position: 'relative' }}>
			<TableContainer
				component={Paper}
				sx={{
					minHeight: { xs: 200 },
					maxHeight: { xs: 'none', sm: 400 },
					borderRadius: 2,
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				<Table size="small" stickyHeader={showData} sx={{ minWidth: 700 }}>
					<CurrencyTableHeader
						compared={compared}
						order={order}
						orderBy={orderBy}
						onSort={handleSort}
					/>
					<CurrencyTableBody
						compared={compared}
						sortedRows={sortedRows}
						orderBy={orderBy}
					/>
				</Table>

				{/* Overlay state banner */}
				{(loading || error) && (
					<CurrencyTableStateBanner loading={loading} error={error} />
				)}
			</TableContainer>
		</Box>
	);
}
