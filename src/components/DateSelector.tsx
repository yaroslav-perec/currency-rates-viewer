import { Stack, TextField, Tooltip } from '@mui/material';
import { clampToPast90Days, todayISO } from '../utils/date';
import { useId } from 'react';

export default function DateSelector({ value, onChange }: {
	value: string;
	onChange: (s: string) => void;
}) {
	const id = useId();
	const today = todayISO();
	const min = clampToPast90Days(today);

	return (
		<Stack direction="row" spacing={1}>
			<Tooltip title="Select a date up to 90 days back">
				<TextField
					id={id}
					label="Date"
					type="date"
					size="small"
					slotProps={{ htmlInput: { max: today, min } }}
					value={value}
					onChange={(e) => onChange(clampToPast90Days(e.target.value))}
				/>
			</Tooltip>
		</Stack>
	);
}
