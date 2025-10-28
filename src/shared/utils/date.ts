export const DAYS_BACK_LIMIT = 90;

function toUTCDate(iso: string) {
  // iso = 'YYYY-MM-DD'
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export function todayISO(): string {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now.toISOString().slice(0, 10);
}

export function clampToPast90Days(inputISO: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(inputISO)) return todayISO();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const date = new Date(inputISO + 'T00:00:00');
  const min = new Date(today);
  min.setDate(today.getDate() - DAYS_BACK_LIMIT);

  // If the date is in the future → clamp to today
  if (date.getTime() > today.getTime()) return todayISO();

  // If the date is older than 90 days → clamp to min date
  if (date.getTime() < min.getTime()) return min.toISOString().slice(0, 10);

  // Otherwise keep it
  return inputISO;
}

export function last7DaysFrom(selectedISO: string): string[] {
  const start = toUTCDate(selectedISO);
  const out: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(start);
    d.setUTCDate(start.getUTCDate() - i);
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}

export function latestAvailableApiDate(): string {
  const now = new Date();
  // Convert to UTC midnight
  const utcDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  // If we're before ~03:00 local (API still not updated for today), fallback to yesterday UTC
  if (now.getUTCHours() < 2) {
    utcDate.setUTCDate(utcDate.getUTCDate() - 1);
  }
  return utcDate.toISOString().slice(0, 10);
}
