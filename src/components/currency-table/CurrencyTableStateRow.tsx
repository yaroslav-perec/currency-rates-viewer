import { Alert, LinearProgress, TableCell, TableRow } from '@mui/material';

export function CurrencyTableStateRow({ loading, error, colSpan, }: {
	loading: boolean;
	error: Error;
	colSpan: number;
}) {
	if (loading)
		return (
			<TableRow>
				<TableCell colSpan={colSpan}>
					<LinearProgress color="primary" sx={{ my: 2 }} />
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
