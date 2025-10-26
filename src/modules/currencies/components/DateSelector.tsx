import { useId, useState } from 'react';
import { Box, Stack, Tooltip, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { clampToPast90Days, DAYS_BACK_LIMIT, latestAvailableApiDate } from 'src/shared/utils/date';

interface Props {
  value: string;
  onChange: (s: string) => void;
}

export function DateSelector({ value, onChange }: Props) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);

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

  const tooltipTitle = `You can select any date within the last ${DAYS_BACK_LIMIT} days.`;

  return (
    <Stack direction="column" spacing={0.5}>
      <Tooltip title={tooltipTitle} disableHoverListener={isOpen}>
        <Box sx={{ width: '100%' }}>
          <DatePicker
            value={new Date(value)}
            onChange={handleChange}
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            maxDate={latestApiDate}
            minDate={minDate}
            slotProps={{
              textField: {
                id,
                fullWidth: true,
                size: 'small',
              },
            }}
          />
        </Box>
      </Tooltip>

      <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5, mt: 0.5 }}>
        Latest available rates date: <strong>{latestApiDateStr}</strong>
      </Typography>
    </Stack>
  );
}
