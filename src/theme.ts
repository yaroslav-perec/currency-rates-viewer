// src/theme.ts
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	palette: {
		mode: 'light',
		primary: { main: '#000000' },
		secondary: { main: '#424242' },
		background: { default: '#f9f9f9', paper: '#ffffff' },
		text: { primary: '#111111', secondary: '#555555' },
		divider: '#e0e0e0',
	},
	typography: {
		fontFamily: 'Inter, Roboto, sans-serif',
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 600,
		subtitle2: {
			color: '#555',
			fontWeight: 500,
			fontSize: '0.85rem',
			lineHeight: 1.4,
			letterSpacing: 0,
		},
	},
	shape: { borderRadius: 10 },
	components: {
		/* ---------- Global ---------- */
		MuiCssBaseline: {
			styleOverrides: {
				body: { backgroundColor: '#f9f9f9', color: '#111111' },
			},
		},

		/* ---------- Navbar ---------- */
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: '#000000',
					color: '#f5f5f5',
					boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
					borderBottom: '1px solid #1a1a1a',
				},
			},
		},

		/* ---------- Paper & Cards ---------- */
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundColor: '#ffffff',
					color: '#111',
					border: '1px solid #e0e0e0',
					boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
					backgroundImage: 'none',
				},
			},
		},

		/* ---------- Buttons, Chips, Inputs ---------- */
		MuiButtonBase: {
			defaultProps: { disableRipple: true },
		},

		MuiChip: {
			styleOverrides: {
				root: {
					borderRadius: 6,
					fontWeight: 500,
					backgroundColor: '#f7f7f7',
					color: '#111',
					border: '1px solid #ddd',
					'&:hover': { backgroundColor: '#efefef' },
				},
				deleteIcon: {
					color: '#666',
					'&:hover': { color: '#000' },
				},
			},
		},

		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					backgroundColor: '#fff',
					color: '#111',
					'& fieldset': { borderColor: '#ccc' },
					'&:hover fieldset': { borderColor: '#999' },
					'&.Mui-focused fieldset': { borderColor: '#000' },
				},
				input: {
					color: '#111',
					'&::placeholder': { color: '#777' },
				},
			},
		},

		/* ---------- Table Styles ---------- */
		MuiTableHead: {
			styleOverrides: {
				root: {
					backgroundColor: '#fafafa',
					'& .MuiTableCell-root': {
						color: '#111',
						fontWeight: 600,
						borderBottom: '1px solid #e0e0e0',
					},
				},
			},
		},

		MuiTableRow: {
			styleOverrides: {
				root: {
					'&:nth-of-type(odd)': { backgroundColor: '#fcfcfc' },
					'&:hover': { backgroundColor: '#f5f5f5' },
					transition: 'background-color 0.2s ease',
				},
			},
		},

		MuiTableCell: {
			styleOverrides: {
				root: {
					borderColor: '#e0e0e0',
					paddingTop: 8,
					paddingBottom: 8,
				},
			},
		},

		MuiTableSortLabel: {
			styleOverrides: {
				root: {
					color: 'inherit',
					'&.Mui-active': { color: '#000', fontWeight: 600 },
				},
				icon: { color: '#000 !important' },
			},
		},
	},
});
