import { TableBody, TableCell, TableRow } from '@mui/material';
import type { TableRateRow } from './types';

function formatRate(n?: number) {
	if (n == null || Number.isNaN(n)) return '—';
	return n.toFixed(4);
}

interface Props {
	compared: string[];
	sortedRows: TableRateRow[];
	orderBy: string;
}

export function CurrencyTableBody({ compared, sortedRows, orderBy }: Props) {
	return (
		<TableBody>
			{
				sortedRows.map((row) => (
					<TableRow key={row.date}>
						<TableCell
							sx={{
								position: 'sticky',
								left: 0,
								zIndex: 2,
								bgcolor: 'background.paper',
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
				))
			}
		</TableBody>
	);
}
