import { Grid, Box, Typography } from '@mui/material';
import { BaseCurrencySelect } from './BaseCurrencySelect';
import { DateSelector } from './DateSelector';
import { ComparedCurrenciesManager } from './compared-currencies-manager/ComparedCurrenciesManager';

interface Props {
	date: string;
	onDateChange: (d: string) => void;
}

export function ToolbarPanel({ date, onDateChange }: Props) {
	return (
		<Box sx={{ px: 3, py: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
			<Grid container alignItems="flex-start" spacing={2}>
				<Grid size={{ xs: 12, md: 6 }}>
					<Typography variant="subtitle2" sx={{ mb: 0.5 }}>
						Base currency
					</Typography>
					<BaseCurrencySelect />
				</Grid>

				<Grid size={{ xs: 12, md: 'auto' }}>
					<Typography variant="subtitle2" sx={{ mb: 0.5 }}>
						Date
					</Typography>
					<DateSelector value={date} onChange={onDateChange} />
				</Grid>
			</Grid>

			<ComparedCurrenciesManager />
		</Box>
	);
}
