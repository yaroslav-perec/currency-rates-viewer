import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App';
import { store } from './app/store';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#1976d2' },
        secondary: { main: '#009688' },
        background: { default: '#fafafa' },
    },
    typography: {
        fontFamily: 'Inter, Roboto, sans-serif',
    },
    shape: { borderRadius: 12 },
    components: {
        MuiPaper: {
            defaultProps: { elevation: 0 },
            styleOverrides: { root: { backgroundImage: 'none' } },
        },
    }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);
