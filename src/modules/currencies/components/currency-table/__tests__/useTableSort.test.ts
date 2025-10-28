import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import type { TableRateRow } from 'src/modules/currencies/types/table';
import { useTableSort } from '../useTableSort';

const rows: TableRateRow[] = [
  { date: '2025-01-03', rates: { usd: 3, eur: 5 } },
  { date: '2025-01-01', rates: { usd: 1, eur: 7 } },
  { date: '2025-01-02', rates: { usd: 2, eur: 6 } },
];

describe('useTableSort', () => {
  it('initializes with default key and desc order', () => {
    const { result } = renderHook(() => useTableSort(rows));
    expect(result.current.orderBy).toBe('date');
    expect(result.current.order).toBe<'desc'>('desc');
  });

  it('sorts numerically ascending and descending', () => {
    const { result } = renderHook(() => useTableSort(rows, 'usd'));

    // initial (desc)
    let sorted = result.current.sortedRows.map((r) => r.rates.usd);
    expect(sorted).toEqual([3, 2, 1]);

    // toggle to asc
    act(() => result.current.handleSort('usd'));
    sorted = result.current.sortedRows.map((r) => r.rates.usd);
    expect(sorted).toEqual([1, 2, 3]);

    // toggle back to desc
    act(() => result.current.handleSort('usd'));
    sorted = result.current.sortedRows.map((r) => r.rates.usd);
    expect(sorted).toEqual([3, 2, 1]);
  });

  it('sorts by string date ascending and descending', () => {
    const { result } = renderHook(() => useTableSort(rows, 'date'));

    // initial (desc)
    let sorted = result.current.sortedRows.map((r) => r.date);
    expect(sorted).toEqual(['2025-01-03', '2025-01-02', '2025-01-01']);

    // toggle to asc
    act(() => result.current.handleSort('date'));
    sorted = result.current.sortedRows.map((r) => r.date);
    expect(sorted).toEqual(['2025-01-01', '2025-01-02', '2025-01-03']);
  });

  it('resets to ascending when switching columns', () => {
    const { result } = renderHook(() => useTableSort(rows, 'usd'));

    // First, toggle same column → descending → ascending
    act(() => result.current.handleSort('usd'));
    expect(result.current.order).toBe<'asc'>('asc');

    // Then, switch to eur → should reset to asc
    act(() => result.current.handleSort('eur'));
    expect(result.current.orderBy).toBe('eur');
    expect(result.current.order).toBe<'asc'>('asc');
  });

  it('handles mixed or invalid values gracefully', () => {
    const mixed: TableRateRow[] = [
      { date: '2025-01-01', rates: { usd: NaN } },
      { date: '2025-01-02', rates: { usd: 123 } },
    ];

    const { result } = renderHook(() => useTableSort(mixed, 'usd'));

    // should not crash and return same-length array
    expect(result.current.sortedRows.length).toBe(2);
  });
});
