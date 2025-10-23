import { Card, CardContent, Divider, Stack, Grid } from '@mui/material';
import { useState } from 'react';
import BaseCurrencySelect from '../components/BaseCurrencySelect';
import ComparedCurrenciesManager from '../components/ComparedCurrenciesManager';
import DateSelector from '../components/DateSelector';
import CurrencyTable from '../components/CurrencyTable';
import { todayISO } from '../utils/date';

export default function Home() {
	const [date, setDate] = useState(todayISO());

	return (
		<Stack spacing={2}>
			<Card>
				<CardContent>
					<Grid container spacing={2}>
						<Grid size={{ xs: 12, md: 4 }}>
							<BaseCurrencySelect />
						</Grid>
						<Grid size={{ xs: 12, md: 8 }}>
							<ComparedCurrenciesManager />
						</Grid>
						<Grid size={{ xs: 12 }}>
							<DateSelector value={date} onChange={setDate} />
						</Grid>
					</Grid>
				</CardContent>
			</Card>
			<Divider />
			<CurrencyTable selectedDate={date} />
		</Stack>
	);
}
