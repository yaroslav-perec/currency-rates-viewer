import { configureStore } from '@reduxjs/toolkit';
import currenciesReducer from '../features/currencies/currenciesSlice';
import { currencyApi } from '../services/currencyApi';

export const store = configureStore({
	reducer: {
		currencies: currenciesReducer,
		[currencyApi.reducerPath]: currencyApi.reducer,
	},
	middleware: (getDefault) => getDefault().concat(currencyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
