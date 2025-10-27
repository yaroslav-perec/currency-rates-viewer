import { renderHook } from '@testing-library/react';
import { vi, beforeEach, expect, it, describe } from 'vitest';
import * as reduxHooks from 'src/redux/hooks';
import * as apiHooks from '../../../api/currencyApi';
import { useComparedCurrencies } from '../useComparedCurrencies';

type MockedFn = ReturnType<typeof vi.fn>;

// --- Mocks ---
vi.mock('src/redux/hooks', () => ({
  useAppSelector: vi.fn() as MockedFn,
}));

vi.mock('../../../api/currencyApi', () => ({
  useGetCurrenciesListQuery: vi.fn() as MockedFn,
}));

describe('useComparedCurrencies', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns empty available when list is missing', () => {
    (reduxHooks.useAppSelector as MockedFn)
      .mockReturnValueOnce('usd')
      .mockReturnValueOnce(['eur', 'jpy']);

    (apiHooks.useGetCurrenciesListQuery as MockedFn).mockReturnValue({ data: undefined });

    const { result } = renderHook(() => useComparedCurrencies());
    expect(result.current.available).toEqual([]);
  });

  it('filters out base and compared currencies, and uppercases + sorts the rest', () => {
    (reduxHooks.useAppSelector as MockedFn)
      .mockReturnValueOnce('usd')
      .mockReturnValueOnce(['eur', 'jpy']);

    (apiHooks.useGetCurrenciesListQuery as MockedFn).mockReturnValue({
      data: {
        usd: 'US Dollar',
        eur: 'Euro',
        jpy: 'Japanese Yen',
        cad: 'Canadian Dollar',
        aud: 'Australian Dollar',
      },
    });

    const { result } = renderHook(() => useComparedCurrencies());
    expect(result.current.available).toEqual(['AUD', 'CAD']);
    expect(result.current.compared).toEqual(['eur', 'jpy']);
  });

  it('handles all currencies already compared', () => {
    (reduxHooks.useAppSelector as MockedFn)
      .mockReturnValueOnce('usd')
      .mockReturnValueOnce(['eur', 'jpy', 'cad', 'aud']);

    (apiHooks.useGetCurrenciesListQuery as MockedFn).mockReturnValue({
      data: { usd: 'US Dollar', eur: 'Euro', jpy: 'Yen', cad: 'CAD', aud: 'AUD' },
    });

    const { result } = renderHook(() => useComparedCurrencies());
    expect(result.current.available).toEqual([]);
  });
});
