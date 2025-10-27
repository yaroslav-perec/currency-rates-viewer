import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { BASE_API_URL } from 'src/modules/currencies/api/currencyApi';

// Global MSW server for all tests
export const server = setupServer(
  // Default successful responses
  http.get(`${BASE_API_URL}:date/v1/currencies/:base.json`, ({ params }) => {
    return HttpResponse.json({
      date: params.date,
      [params.base as string]: { eur: 0.9, usd: 1.1, jpy: 150 },
    });
  }),

  http.get(`${BASE_API_URL}latest/v1/currencies.json`, () =>
    HttpResponse.json({
      usd: 'US Dollar',
      eur: 'Euro',
      jpy: 'Japanese Yen',
    }),
  ),
);
