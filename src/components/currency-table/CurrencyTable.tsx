import { Paper, Table, TableContainer } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { useRatesForLast7Days } from '../../features/currencies/useRatesForLast7Days';
import { useTableSort } from './useTableSort';
import { CurrencyTableHeader } from './CurrencyTableHeader';
import { CurrencyTableBody } from './CurrencyTableBody';
import type { TableRateRow } from './types';

export function CurrencyTable({ selectedDate }: { selectedDate: string }) {
	const base = useAppSelector((s) => s.currencies.base);
	const compared = useAppSelector((s) => s.currencies.compared);

	const { data: rows, loading, error } = useRatesForLast7Days(selectedDate, base) as {
		data: TableRateRow[];
		loading: boolean;
		error: Error;
	};

	const { order, orderBy, handleSort, sortedRows } = useTableSort(rows);

	return (
		<TableContainer component={Paper} sx={{ maxHeight: { xs: 'none', sm: 400 }, borderRadius: 2 }}>
			<Table size="small" stickyHeader sx={{ minWidth: 700 }}>
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
					loading={loading}
					error={error}
				/>
			</Table>
		</TableContainer>
	);
}
