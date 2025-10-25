import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CurrencyCode } from '../../types/currency.ts';

export interface CurrencyState {
	base: CurrencyCode;
	compared: CurrencyCode[];
}

const initialState: CurrencyState = {
	base: 'gbp',
	compared: ['usd', 'eur', 'jpy', 'chf', 'cad', 'aud', 'zar'],
};

const MIN = 3;
const MAX = 7;

const currenciesSlice = createSlice({
	name: 'currencies',
	initialState,
	reducers: {
		setBase(state, action: PayloadAction<CurrencyCode>) {
			state.base = action.payload;
			state.compared = state.compared.filter((c) => c !== state.base);
		},
		addCompared(state, action: PayloadAction<CurrencyCode>) {
			const code = action.payload;
			if (state.compared.includes(code) || code === state.base) return;
			if (state.compared.length >= MAX) return;
			state.compared.push(code);
		},
		removeCompared(state, action: PayloadAction<CurrencyCode>) {
			if (state.compared.length <= MIN) return;
			state.compared = state.compared.filter((c) => c !== action.payload);
		},
	},
});

export const { setBase, addCompared, removeCompared } = currenciesSlice.actions;
export default currenciesSlice.reducer;
