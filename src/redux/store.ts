import { configureStore } from '@reduxjs/toolkit';
import currenciesReducer from 'src/modules/currencies/currenciesSlice';
import { currencyApi } from 'src/modules/currencies/api/currencyApi';

export const store = configureStore({
	reducer: {
		currencies: currenciesReducer,
		[currencyApi.reducerPath]: currencyApi.reducer,
	},
	middleware: (getDefault) => getDefault().concat(currencyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
