import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { renderHook } from '@testing-library/react';
import * as dateUtils from 'src/shared/utils/date';
import { useRatesForLast7Days } from '../useRatesForLast7Days';
import * as currencyApi from '../../api/currencyApi';

vi.mock('../../api/currencyApi', () => ({
  useGetRatesByDateAndBaseQuery: vi.fn(),
}));

vi.mock('src/shared/utils/date', () => ({
  last7DaysFrom: vi.fn(),
}));

describe('useRatesForLast7Days', () => {
  const mockUseGetRatesByDateAndBaseQuery =
    currencyApi.useGetRatesByDateAndBaseQuery as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    (dateUtils.last7DaysFrom as Mock).mockReturnValue([
      '2025-10-01',
      '2025-10-02',
      '2025-10-03',
      '2025-10-04',
      '2025-10-05',
      '2025-10-06',
      '2025-10-07',
    ]);
  });

  it('returns aggregated data for all days', () => {
    mockUseGetRatesByDateAndBaseQuery.mockReturnValueOnce({
      data: { date: '2025-10-01', rates: { usd: 1.1 } },
      isFetching: false,
      error: undefined,
    });
    for (let i = 1; i < 7; i++) {
      mockUseGetRatesByDateAndBaseQuery.mockReturnValueOnce({
        data: { date: `2025-10-0${i + 1}`, rates: { usd: 1.1 + i * 0.01 } },
        isFetching: false,
        error: undefined,
      });
    }

    const { result } = renderHook(() => useRatesForLast7Days('2025-10-07', 'eur'));

    expect(result.current.data).toHaveLength(7);
    expect(result.current.data[0]).toMatchObject({ date: '2025-10-01', usd: 1.1 });
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it('returns loading = true when any query is fetching', () => {
    mockUseGetRatesByDateAndBaseQuery.mockReturnValueOnce({
      data: { date: '2025-10-01', rates: { usd: 1.1 } },
      isFetching: true,
      error: undefined,
    });
    for (let i = 1; i < 7; i++) {
      mockUseGetRatesByDateAndBaseQuery.mockReturnValueOnce({
        data: { date: `2025-10-0${i + 1}`, rates: { usd: 1.2 } },
        isFetching: false,
        error: undefined,
      });
    }

    const { result } = renderHook(() => useRatesForLast7Days('2025-10-07', 'eur'));
    expect(result.current.loading).toBe(true);
  });

  it('returns first error if any query fails', () => {
    mockUseGetRatesByDateAndBaseQuery
      .mockReturnValueOnce({
        data: { date: '2025-10-01', rates: { usd: 1.1 } },
        isFetching: false,
        error: undefined,
      })
      .mockReturnValueOnce({
        data: undefined,
        isFetching: false,
        error: { message: 'Network Error' },
      });

    for (let i = 2; i < 7; i++) {
      mockUseGetRatesByDateAndBaseQuery.mockReturnValueOnce({
        data: { date: `2025-10-0${i + 1}`, rates: { usd: 1.2 } },
        isFetching: false,
        error: undefined,
      });
    }

    const { result } = renderHook(() => useRatesForLast7Days('2025-10-07', 'eur'));
    expect(result.current.error).toEqual({ message: 'Network Error' });
  });

  it('skips falsy data entries', () => {
    mockUseGetRatesByDateAndBaseQuery
      .mockReturnValueOnce({ data: undefined, isFetching: false, error: undefined })
      .mockReturnValueOnce({
        data: { date: '2025-10-02', rates: { usd: 1.15 } },
        isFetching: false,
        error: undefined,
      });

    for (let i = 2; i < 7; i++) {
      mockUseGetRatesByDateAndBaseQuery.mockReturnValueOnce({
        data: undefined,
        isFetching: false,
        error: undefined,
      });
    }

    const { result } = renderHook(() => useRatesForLast7Days('2025-10-07', 'eur'));
    expect(result.current.data).toEqual([{ date: '2025-10-02', usd: 1.15 }]);
  });
});
