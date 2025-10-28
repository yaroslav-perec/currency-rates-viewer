import { Paper, Divider, Box, Typography } from '@mui/material';
import { useState } from 'react';
import { todayISO } from 'src/shared/utils/date';
import { ToolbarPanel } from './components/ToolbarPanel';
import { CurrencyTable } from './components/currency-table/CurrencyTable';

export default function CurrencyRatesPage() {
  const [date, setDate] = useState(todayISO());

  return (
    <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
      <ToolbarPanel date={date} onDateChange={setDate} />

      <Divider />

      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Exchange Rates ({date})
        </Typography>

        <CurrencyTable selectedDate={date} />
      </Box>
    </Paper>
  );
}
