import { Box, Chip, Stack, Typography } from '@mui/material';

interface Props {
  compared: string[];
  min: number;
  max: number;
  onDelete?: (code: string) => void;
}

export function ComparedCurrenciesList({ compared, min, max, onDelete }: Props) {
  const canDelete = compared.length > min;

  const handleDelete = (code: string) => {
    if (canDelete && onDelete) {
      onDelete(code);
    }
  };

  return (
    <Box sx={{ borderTop: '1px solid #eee', mt: 1.5, pt: 1.5 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          Compared currencies
        </Typography>

        <Chip
          size="small"
          label={`${compared.length}/${max}`}
          color={compared.length >= max ? 'error' : 'default'}
          sx={{
            fontWeight: 600,
            height: 22,
            bgcolor: compared.length >= max ? '#ffebee' : '#f5f5f5',
          }}
        />
      </Stack>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {compared.map((code) => (
          <Chip
            key={code}
            label={code.toUpperCase()}
            onDelete={canDelete && onDelete ? () => handleDelete(code) : undefined}
            color="primary"
            variant="outlined"
          />
        ))}
      </Box>
    </Box>
  );
}
