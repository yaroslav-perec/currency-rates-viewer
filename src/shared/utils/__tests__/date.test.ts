import { describe, it, expect } from 'vitest';
import {
  todayISO,
  clampToPast90Days,
  last7DaysFrom,
  latestAvailableApiDate,
  DAYS_BACK_LIMIT,
} from '../date';
import { withMockedDate } from '../../tests/mockDate';

describe('date utils', () => {
  it('returns today in YYYY-MM-DD format', () => {
    const iso = todayISO();
    expect(iso).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('clamps future date to today', () => {
    const today = todayISO();
    const future = new Date(today + 'T00:00:00Z');
    future.setUTCDate(future.getUTCDate() + 5);
    const futureISO = future.toISOString().slice(0, 10);
    expect(clampToPast90Days(futureISO)).toBe(today);
  });

  it('clamps too old date to min (90 days back)', () => {
    const today = todayISO();
    const tooOld = new Date(today + 'T00:00:00Z');
    tooOld.setUTCDate(tooOld.getUTCDate() - 120);
    const minExpected = new Date(today + 'T00:00:00Z');
    minExpected.setUTCDate(minExpected.getUTCDate() - DAYS_BACK_LIMIT);
    expect(clampToPast90Days(tooOld.toISOString().slice(0, 10))).toBe(
      minExpected.toISOString().slice(0, 10),
    );
  });

  it('keeps valid date within 90-day range unchanged', () => {
    const today = todayISO();
    const midDate = new Date(today + 'T00:00:00Z');
    midDate.setUTCDate(midDate.getUTCDate() - DAYS_BACK_LIMIT / 2);
    const iso = midDate.toISOString().slice(0, 10);
    expect(clampToPast90Days(iso)).toBe(iso);
  });

  it('returns last 7 days including selected date', () => {
    const today = todayISO();
    const result = last7DaysFrom(today);
    expect(result).toHaveLength(7);
    expect(result.at(-1)).toBe(today);
    expect(result[0] < result[6]).toBe(true);
  });

  /* ---------- latestAvailableApiDate ---------- */

  it('returns yesterday UTC if before 2:00 UTC', () => {
    const mockedDate = new Date(Date.UTC(2025, 0, 2, 1, 0, 0));
    withMockedDate(mockedDate, () => {
      const result = latestAvailableApiDate();
      expect(result).toBe('2025-01-01');
    });
  });

  it('returns today UTC if after 2:00 UTC', () => {
    const mockedDate = new Date(Date.UTC(2025, 0, 2, 3, 0, 0));
    withMockedDate(mockedDate, () => {
      const result = latestAvailableApiDate();
      expect(result).toBe('2025-01-02');
    });
  });
});
