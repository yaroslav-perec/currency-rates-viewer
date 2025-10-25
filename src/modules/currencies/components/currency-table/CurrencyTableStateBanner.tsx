import { Alert, Box, LinearProgress, Typography } from '@mui/material';

interface Props {
	loading: boolean;
	error?: Error | null;
}

export function CurrencyTableStateBanner({ loading, error }: Props) {
	if (!loading && !error) return null;

	return (
		<Box
			sx={{
				position: 'absolute',
				inset: 0, // shorthand for top/left/right/bottom = 0
				bgcolor: 'rgba(255,255,255,0.9)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				zIndex: 5,
			}}
		>
			{/* ---------- Loading ---------- */}
			{loading && (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 1.5,
						width: '100%',
						maxWidth: 480,
						px: { xs: 2, sm: 3 },
					}}
				>
					<LinearProgress
						color="primary"
						sx={{
							width: { xs: '90%', sm: '70%' },
							maxWidth: 400,
							mb: 0.5,
						}}
					/>
					<Typography
						variant="body2"
						color="text.secondary"
						sx={{
							fontWeight: 500,
							fontSize: { xs: '0.85rem', sm: '0.9rem' },
							textAlign: 'center',
						}}
					>
						Loading latest exchange rates…
					</Typography>
				</Box>
			)}

			{/* ---------- Error ---------- */}
			{error && (
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '100%',
						px: 2,
					}}
				>
					<Alert
						severity="error"
						sx={{
							width: '100%',
							maxWidth: 420,
							fontSize: { xs: '0.85rem', sm: '0.9rem' },
						}}
					>
						Failed to load exchange rates. Please try again later.
					</Alert>
				</Box>
			)}
		</Box>
	);
}
