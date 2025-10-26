import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { currencyApi } from '../currencyApi';

const createTestStore = () =>
  configureStore({
    reducer: { [currencyApi.reducerPath]: currencyApi.reducer },
    middleware: (gDM) => gDM().concat(currencyApi.middleware),
  });

describe('currencyApi', () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock as unknown as typeof fetch);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  describe('getCurrenciesList', () => {
    it('returns the currencies list on success', async () => {
      const mockData = { usd: 'United States dollar', eur: 'Euro' };
      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockData,
      } as Response);

      const store = createTestStore();
      await expect(
        store.dispatch(currencyApi.endpoints.getCurrenciesList.initiate()).unwrap(),
      ).resolves.toEqual(mockData);

      expect(fetchMock).toHaveBeenCalledTimes(1);
      // Uses the full list URL from the API implementation
      const expectedUrl =
        'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json';
      expect(fetchMock).toHaveBeenCalledWith(expectedUrl);
    });

    it('rejects with status and message on HTTP error', async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({ message: 'Server error' }),
      } as Response);

      const store = createTestStore();
      await expect(
        store.dispatch(currencyApi.endpoints.getCurrenciesList.initiate()).unwrap(),
      ).rejects.toEqual(
        expect.objectContaining({
          status: 500,
          data: 'Failed to fetch currencies list',
        }),
      );
    });
  });

  describe('getRatesByDateAndBase', () => {
    it('returns shaped data when response contains rates for the base', async () => {
      const date = '2024-01-01';
      const base = 'usd';
      const mockJson = {
        date,
        usd: { eur: 0.9, jpy: 150 },
      };

      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockJson,
      } as Response);

      const store = createTestStore();
      const data = await store
        .dispatch(currencyApi.endpoints.getRatesByDateAndBase.initiate({ date, base }))
        .unwrap();

      expect(data).toEqual({
        date,
        base,
        rates: { eur: 0.9, jpy: 150 },
      });

      const expectedUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${base}.json`;
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(expectedUrl);
    });

    it('falls back to requested date when "date" is missing in response', async () => {
      const date = '2024-02-10';
      const base = 'eur';
      const mockJson = {
        // no "date" field on purpose
        eur: { usd: 1.1, jpy: 160 },
      };

      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockJson,
      } as Response);

      const store = createTestStore();
      const data = await store
        .dispatch(currencyApi.endpoints.getRatesByDateAndBase.initiate({ date, base }))
        .unwrap();

      expect(data).toEqual({
        date, // falls back to the requested date
        base,
        rates: { usd: 1.1, jpy: 160 },
      });
    });

    it('rejects when HTTP response is not ok', async () => {
      const date = '2024-03-01';
      const base = 'usd';

      fetchMock.mockResolvedValue({
        ok: false,
        status: 404,
        json: async () => ({}),
      } as Response);

      const store = createTestStore();
      await expect(
        store
          .dispatch(currencyApi.endpoints.getRatesByDateAndBase.initiate({ date, base }))
          .unwrap(),
      ).rejects.toEqual(
        expect.objectContaining({
          status: 404,
          data: `Failed to fetch rates for ${base} on ${date}`,
        }),
      );
    });

    it('rejects when response does not contain rates for the base key', async () => {
      const date = '2024-04-01';
      const base = 'usd';
      const mockJson = {
        date,
        eur: { usd: 1.2 },
      };

      fetchMock.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockJson,
      } as Response);

      const store = createTestStore();
      await expect(
        store
          .dispatch(currencyApi.endpoints.getRatesByDateAndBase.initiate({ date, base }))
          .unwrap(),
      ).rejects.toEqual(
        expect.objectContaining({
          status: 500,
          data: `Invalid response for base "${base}"`,
        }),
      );
    });
  });
});