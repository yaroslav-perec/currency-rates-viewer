import type { PropsWithChildren } from 'react';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';

export default function Layout({ children }: PropsWithChildren) {
	return (
		<Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div">
						Currency Rates
					</Typography>
				</Toolbar>
			</AppBar>
			<Container maxWidth="md" sx={{ py: 3 }}>
				{children}
			</Container>
		</Box>
	);
}
