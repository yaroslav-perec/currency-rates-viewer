import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type CurrencyCode = string;

export const currencyApi = createApi({
	reducerPath: 'currencyApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/' }),
	endpoints: (builder) => ({
		getCurrenciesList: builder.query<Record<string, string>, void>({
			queryFn: async () => {
				const url =
					'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json';
				const res = await fetch(url);
				const data = await res.json();
				return { data };
			},
		}),
		getRatesByDateAndBase: builder.query<
			{ date: string; base: string; rates: Record<string, number> },
			{ date: string; base: string }
		>({
			queryFn: async ({ date, base }) => {
				const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${base}.json`;
				const res = await fetch(url);
				const json = await res.json();
				return { data: { date: json.date ?? date, base, rates: json[base] } };
			},
		}),
	}),
});

export const {
	useGetCurrenciesListQuery,
	useGetRatesByDateAndBaseQuery,
} = currencyApi;
