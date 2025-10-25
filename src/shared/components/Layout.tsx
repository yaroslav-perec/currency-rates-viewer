import type { PropsWithChildren } from 'react';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';

export function Layout({ children }: PropsWithChildren) {
	return (
		<Box sx={{ minHeight: '100vh' }}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" sx={{ fontWeight: 600 }}>
						Currency Rates
					</Typography>
				</Toolbar>
			</AppBar>
			<Container maxWidth="md" sx={{ py: 4 }}>
				{children}
			</Container>
		</Box>
	);
}
