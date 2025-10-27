import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useTableSort } from '../useTableSort';

const rows = [
  { date: '2025-01-03', name: 'Charlie', value: 3 },
  { date: '2025-01-01', name: 'Alice', value: 1 },
  { date: '2025-01-02', name: 'Bob', value: 2 },
] as Record<string, string | number>[];

describe('useTableSort', () => {
  it('initializes with default key and desc order', () => {
    const { result } = renderHook(() => useTableSort(rows));
    expect(result.current.orderBy).toBe('date');
    expect(result.current.order).toBe<'desc'>('desc');
  });

  it('sorts numerically ascending and descending', () => {
    const { result } = renderHook(() => useTableSort(rows, 'value'));

    // initial (desc)
    let sorted = result.current.sortedRows.map((r) => r.value);
    expect(sorted).toEqual([3, 2, 1]);

    // toggle to asc
    act(() => result.current.handleSort('value'));
    sorted = result.current.sortedRows.map((r) => r.value);
    expect(sorted).toEqual([1, 2, 3]);

    // toggle back to desc
    act(() => result.current.handleSort('value'));
    sorted = result.current.sortedRows.map((r) => r.value);
    expect(sorted).toEqual([3, 2, 1]);
  });

  it('sorts alphabetically ascending and descending', () => {
    const { result } = renderHook(() => useTableSort(rows, 'name'));

    // initial (desc)
    let sorted = result.current.sortedRows.map((r) => r.name);
    expect(sorted).toEqual(['Charlie', 'Bob', 'Alice']);

    // toggle to asc
    act(() => result.current.handleSort('name'));
    sorted = result.current.sortedRows.map((r) => r.name);
    expect(sorted).toEqual(['Alice', 'Bob', 'Charlie']);
  });

  it('resets to ascending when switching columns', () => {
    const { result } = renderHook(() => useTableSort(rows, 'name'));

    // First, toggle same column to descending
    act(() => result.current.handleSort('name'));
    expect(result.current.order).toBe<'asc'>('asc');

    // Then, switch column → should reset to asc
    act(() => result.current.handleSort('value'));
    expect(result.current.orderBy).toBe('value');
    expect(result.current.order).toBe<'asc'>('asc');
  });

  it('handles mixed or invalid values gracefully', () => {
    const mixed = [
      { date: '2025-01-01', value: 'abc' as unknown as number },
      { date: '2025-01-02', value: 123 },
    ];
    const { result } = renderHook(() => useTableSort(mixed, 'value'));
    // should not crash and return same-length array
    expect(result.current.sortedRows.length).toBe(2);
  });
});
