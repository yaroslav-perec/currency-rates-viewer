import {
	Paper,
	Grid,
	Typography,
	Divider,
	Box,
	Stack,
} from '@mui/material';
import { useState } from 'react';
import BaseCurrencySelect from '../components/BaseCurrencySelect';
import ComparedCurrenciesManager from '../components/compared-currencies-manager/ComparedCurrenciesManager';
import DateSelector from '../components/DateSelector';
import { CurrencyTable } from '../components/currency-table/CurrencyTable';
import { todayISO } from '../utils/date';

export default function Home() {
	const [date, setDate] = useState(todayISO());

	return (
		<Paper
			sx={{
				bgcolor: 'background.paper',
				borderRadius: 3,
				overflow: 'hidden',
				border: '1px solid #e0e0e0',
			}}
		>
			{/* --- Toolbar --- */}
			<Box
				sx={{
					px: 3,
					py: 2,
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
				}}
			>
				{/* Top row: base + date */}
				<Grid
					container
					alignItems="flex-start"
					spacing={2}
				>
					<Grid size={{ xs: 12, md: 6 }}>
						<Stack direction="row" alignItems="center" spacing={2}>
							<Box sx={{ flex: 1 }}>
								<Typography
									variant="subtitle2"
									sx={{ mb: 0.5, color: 'text.secondary', fontWeight: 500 }}
								>
									Base currency
								</Typography>
								<BaseCurrencySelect />
							</Box>
						</Stack>
					</Grid>

					<Grid size={{ xs: 12, md: 'auto' }}>
						<Box sx={{ width: { xs: '100%', md: 220 } }}>
							<Typography
								variant="subtitle2"
								sx={{ mb: 0.5, color: 'text.secondary', fontWeight: 500 }}
							>
								Date
							</Typography>
							<DateSelector value={date} onChange={setDate} />
						</Box>
					</Grid>
				</Grid>

				{/* Bottom row: compared currencies */}
				<Box>
					<ComparedCurrenciesManager />
				</Box>
			</Box>

			<Divider />

			{/* --- Data Table Section --- */}
			<Box sx={{ p: 3 }}>
				<Typography
					variant="h6"
					sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}
				>
					Exchange Rates ({date})
				</Typography>

				<CurrencyTable selectedDate={date} />
			</Box>
		</Paper>
	);
}
