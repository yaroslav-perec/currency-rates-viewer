'use client';

import { Stack, Tooltip, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
	clampToPast90Days,
	DAYS_BACK_LIMIT,
	latestAvailableApiDate,
} from '../utils/date';
import { useId } from 'react';

export default function DateSelector({ value, onChange }: {
	value: string;
	onChange: (s: string) => void;
}) {
	const id = useId();

	// ✅ Use latest available API date
	const latestApiDateStr = latestAvailableApiDate();
	const latestApiDate = new Date(latestApiDateStr + 'T00:00:00');

	// ✅ Define min selectable date (90 days back)
	const minDate = new Date(latestApiDate);
	minDate.setDate(latestApiDate.getDate() - DAYS_BACK_LIMIT);

	return (
		<Stack direction="column" spacing={0.5}>
			<Tooltip
				title={`Select a date up to ${DAYS_BACK_LIMIT} days back. Latest available data: ${latestApiDateStr}`}
			>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<DatePicker
						value={new Date(value)}
						onChange={(newValue) => {
							if (newValue instanceof Date && !isNaN(newValue.getTime())) {
								const iso = newValue.toISOString().slice(0, 10);
								onChange(clampToPast90Days(iso));
							}
						}}
						maxDate={latestApiDate}
						minDate={minDate}
						slotProps={{
							textField: {
								id,
								fullWidth: true,
								size: 'small',
								sx: {
									'& .MuiOutlinedInput-root': {
										backgroundColor: '#fff',
										borderRadius: 1,
										'& fieldset': { borderColor: '#ccc' },
										'&:hover fieldset': { borderColor: '#999' },
										'&.Mui-focused fieldset': { borderColor: '#000' },
									},
									'& input': { color: '#111', fontWeight: 500 },
								},
							},
						}}
					/>
				</LocalizationProvider>
			</Tooltip>

			{/* ✅ Friendly caption below field */}
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
