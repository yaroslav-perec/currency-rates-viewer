import { Alert, LinearProgress, TableCell, TableRow, Typography, Box } from '@mui/material';

interface Props {
	loading: boolean;
	error?: Error | null;
	colSpan: number;
}

export function CurrencyTableStateRow({ loading, error, colSpan }: Props) {
	if (loading)
		return (
			<TableRow>
				<TableCell colSpan={colSpan} sx={{ py: 3, textAlign: 'center' }}>
					<Box sx={{ px: 2 }}>
						<LinearProgress
							color="primary"
							variant="indeterminate"
							sx={{ mb: 1 }}
						/>
						<Typography variant="caption" color="text.secondary">
							Loading latest exchange rates…
						</Typography>
					</Box>
				</TableCell>
			</TableRow>
		);

	if (error)
		return (
			<TableRow>
				<TableCell colSpan={colSpan}>
					<Alert severity="error">Failed to load exchange rates</Alert>
				</TableCell>
			</TableRow>
		);

	return null;
}
