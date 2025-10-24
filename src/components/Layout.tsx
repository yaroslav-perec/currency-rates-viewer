import type { PropsWithChildren } from 'react';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';

export default function Layout({ children }: PropsWithChildren) {
	return (
		<Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
			<AppBar position="static" color="primary" enableColorOnDark>
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
