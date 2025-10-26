import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCurrencyCodes } from '../useCurrencyCodes';
import * as currencyApi from '../../api/currencyApi';

vi.mock('../../api/currencyApi', () => ({
  useGetCurrenciesListQuery: vi.fn(),
}));

describe('useCurrencyCodes', () => {
  const mockUseGetCurrenciesListQuery =
    currencyApi.useGetCurrenciesListQuery as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns empty list while loading', () => {
    mockUseGetCurrenciesListQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    });

    const { result } = renderHook(() => useCurrencyCodes());

    expect(result.current.codes).toEqual([]);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('returns formatted and sorted currency codes when data is available', () => {
    mockUseGetCurrenciesListQuery.mockReturnValue({
      data: { usd: 'US Dollar', eur: 'Euro', gbp: 'British Pound' },
      isLoading: false,
      isError: false,
      error: null,
    });

    const { result } = renderHook(() => useCurrencyCodes());

    // should return uppercase, sorted alphabetically
    expect(result.current.codes).toEqual(['EUR', 'GBP', 'USD']);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it('returns an empty array if API returns undefined', () => {
    mockUseGetCurrenciesListQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
      error: null,
    });

    const { result } = renderHook(() => useCurrencyCodes());

    expect(result.current.codes).toEqual([]);
  });

  it('passes through API error flags', () => {
    const error = { message: 'Network Error' };
    mockUseGetCurrenciesListQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error,
    });

    const { result } = renderHook(() => useCurrencyCodes());

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBe(error);
  });
});
