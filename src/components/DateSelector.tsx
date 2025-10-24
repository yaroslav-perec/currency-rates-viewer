import { useId } from 'react';
import { Stack, TextField, Tooltip } from '@mui/material';
import { clampToPast90Days, todayISO, DAYS_BACK_LIMIT } from '../utils/date';

export default function DateSelector({ value, onChange }: {
	value: string;
	onChange: (s: string) => void;
}) {
	const id = useId();

	const today = todayISO();
	const todayDate = new Date(today + 'T00:00:00');
	const minDate = new Date(todayDate);
	minDate.setDate(todayDate.getDate() - DAYS_BACK_LIMIT);

	const min = minDate.toISOString().slice(0, 10);

	return (
		<Stack direction="row" spacing={1}>
			<Tooltip title="Select a date up to 90 days back">
				<TextField
					fullWidth
					id={id}
					type="date"
					size="small"
					slotProps={{
						input: {
							inputProps: { max: today, min },
						},
					}}
					value={value}
					onChange={(e) => onChange(clampToPast90Days(e.target.value))}
				/>
			</Tooltip>
		</Stack>
	);
}
