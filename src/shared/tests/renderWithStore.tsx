import React from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { currencyApi } from 'src/modules/currencies/api/currencyApi';
import currenciesReducer from 'src/modules/currencies/currenciesSlice';

export function renderWithStore(ui: React.ReactElement, preloadedState?: object) {
  const store = configureStore({
    reducer: {
      [currencyApi.reducerPath]: currencyApi.reducer,
      currencies: currenciesReducer,
    },
    middleware: (getDefault) => getDefault().concat(currencyApi.middleware),
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>{ui}</LocalizationProvider>
    </Provider>,
  );
}
