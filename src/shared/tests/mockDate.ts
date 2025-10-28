/**
 * Temporarily replaces the global Date constructor with a fixed UTC time.
 * Restores the real Date automatically after callback completes.
 *
 * Usage:
 *   withMockedDate(new Date(Date.UTC(2025, 0, 1, 3)), () => {
 *     expect(latestAvailableApiDate()).toBe('2025-01-01');
 *   });
 */
export function withMockedDate(mockedUtcTime: Date, callback: () => void): void {
  const RealDate = Date;

  class MockDate extends Date {
    constructor() {
      super(mockedUtcTime.getTime());
    }
    static now() {
      return mockedUtcTime.getTime();
    }
  }

  // Type-safe override for globalThis
  globalThis.Date = MockDate as unknown as DateConstructor;

  try {
    callback();
  } finally {
    globalThis.Date = RealDate;
  }
}
