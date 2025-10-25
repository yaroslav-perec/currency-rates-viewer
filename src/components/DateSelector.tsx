import { Stack, Tooltip, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useId } from 'react';
import {
	clampToPast90Days,
	DAYS_BACK_LIMIT,
	latestAvailableApiDate,
} from '../utils/date';

interface Props {
	value: string;
	onChange: (s: string) => void;
}

export default function DateSelector({ value, onChange }: Props) {
	const id = useId();
	const latestApiDateStr = latestAvailableApiDate();
	const latestApiDate = new Date(`${latestApiDateStr}T00:00:00`);

	const minDate = new Date(latestApiDate);
	minDate.setDate(latestApiDate.getDate() - DAYS_BACK_LIMIT);

	const handleChange = (newValue: Date | null) => {
		if (newValue instanceof Date && !isNaN(newValue.getTime())) {
			const iso = newValue.toISOString().slice(0, 10);
			onChange(clampToPast90Days(iso));
		}
	};

	const tooltipTitle = `Select a date up to ${DAYS_BACK_LIMIT} days back. Latest available data: ${latestApiDateStr}`;

	return (
		<Stack direction="column" spacing={0.5}>
			<Tooltip title={tooltipTitle}>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<DatePicker
						value={new Date(value)}
						onChange={handleChange}
						maxDate={latestApiDate}
						minDate={minDate}
						slotProps={{
							textField: { id, fullWidth: true, size: 'small' },
						}}
					/>
				</LocalizationProvider>
			</Tooltip>

			<Typography
				variant="caption"
				color="text.secondary"
				sx={{ ml: 0.5, mt: 0.5 }}
			>
				Latest available rates: <strong>{latestApiDateStr}</strong>
			</Typography>
		</Stack>
	);
}
