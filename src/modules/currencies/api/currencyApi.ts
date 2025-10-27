import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CurrenciesResponse, RatesRequestParams, RatesResponse } from '../types/currency';

const BASE_API_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@';
const CURRENCIES_LIST_URL = `${BASE_API_URL}latest/v1/currencies.json`;

export const currencyApi = createApi({
  reducerPath: 'currencyApi',
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getCurrenciesList: builder.query<CurrenciesResponse, void>({
      async queryFn() {
        try {
          const res = await fetch(CURRENCIES_LIST_URL);
          if (!res.ok) {
            return {
              error: {
                status: res.status,
                data: 'Failed to fetch currencies list',
              },
            };
          }

          const data = (await res.json()) as CurrenciesResponse;
          return { data };
        } catch (e) {
          return {
            error: {
              status: 500,
              data: (e as Error).message ?? 'Unexpected error',
            },
          };
        }
      },
    }),

    getRatesByDateAndBase: builder.query<RatesResponse, RatesRequestParams>({
      async queryFn({ date, base }) {
        try {
          const url = `${BASE_API_URL}${date}/v1/currencies/${base}.json`;
          const res = await fetch(url);

          if (!res.ok) {
            return {
              error: {
                status: res.status,
                data: `Failed to fetch rates for ${base} on ${date}`,
              },
            };
          }

          const json = (await res.json()) as RatesResponse;
          const maybeRates = json[base];
          if (typeof maybeRates !== 'object' || maybeRates === null) {
            return {
              error: {
                status: 500,
                data: `Invalid response for base "${base}"`,
              },
            };
          }

          return {
            data: {
              date: json.date ?? date,
              base,
              rates: maybeRates,
            },
          };
        } catch (e) {
          return {
            error: {
              status: 500,
              data: (e as Error).message ?? 'Unexpected error',
            },
          };
        }
      },
    }),
  }),
});

export const { useGetCurrenciesListQuery, useGetRatesByDateAndBaseQuery } = currencyApi;
