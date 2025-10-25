import { describe, it, expect } from 'vitest';
import { todayISO, clampToPast90Days } from 'shared/utils/date';

describe('clampToPast90Days (UTC-safe)', () => {
	it('clamps future to today', () => {
		const today = todayISO();
		const future = new Date(today + 'T00:00:00Z');
		future.setUTCDate(future.getUTCDate() + 5);
		const futureISO = future.toISOString().slice(0, 10);
		expect(clampToPast90Days(futureISO)).toBe(today);
	});

	it('clamps older than 90d to min', () => {
		const today = todayISO();
		const tooOld = new Date(today + 'T00:00:00Z');
		tooOld.setUTCDate(tooOld.getUTCDate() - 120);
		const minExpected = new Date(today + 'T00:00:00Z');
		minExpected.setUTCDate(minExpected.getUTCDate() - 90);
		expect(clampToPast90Days(tooOld.toISOString().slice(0, 10)))
			.toBe(minExpected.toISOString().slice(0, 10));
	});
});
