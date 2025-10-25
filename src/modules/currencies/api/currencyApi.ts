import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CurrenciesResponse, RatesResponse } from '../types/currency';

const BASE_API_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@';
const CURRENCIES_LIST_URL = `${BASE_API_URL}latest/v1/currencies.json`;

export const currencyApi = createApi({
	reducerPath: 'currencyApi',
	baseQuery: fetchBaseQuery(), // ⚠️ no baseUrl — we’ll use full URLs
	endpoints: (builder) => ({
		getCurrenciesList: builder.query<CurrenciesResponse, void>({
			queryFn: async () => {
				const res = await fetch(CURRENCIES_LIST_URL);
				if (!res.ok) return { error: { status: res.status, data: 'Failed to fetch currencies list' } };
				const data = (await res.json()) as CurrenciesResponse;
				return { data };
			},
		}),
		getRatesByDateAndBase: builder.query<
			{ date: string; base: string; rates: Record<string, number> },
			{ date: string; base: string }
		>({
			queryFn: async ({ date, base }) => {
				const url = `${BASE_API_URL}${date}/v1/currencies/${base}.json`;
				const res = await fetch(url);
				if (!res.ok)
					return {
						error: { status: res.status, data: `Failed to fetch rates for ${base} on ${date}` },
					};

				const json = (await res.json()) as RatesResponse;
				const rates = json[base] as Record<string, number> | undefined;

				if (!rates) {
					return {
						error: { status: 500, data: `Invalid response for base "${base}"` },
					};
				}

				return { data: { date: (json.date as string) ?? date, base, rates } };
			},
		}),
	}),
});

export const {
	useGetCurrenciesListQuery,
	useGetRatesByDateAndBaseQuery,
} = currencyApi;
