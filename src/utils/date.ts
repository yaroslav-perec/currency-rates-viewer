export const DAYS_BACK_LIMIT = 90;

export function todayISO(): string {
	const d = new Date();
	d.setHours(0, 0, 0, 0);
	return d.toISOString().slice(0, 10);
}

export function clampToPast90Days(inputISO: string): string {
	const today = new Date(todayISO());
	const date = new Date(inputISO);
	const min = new Date(today);
	min.setDate(min.getDate() - DAYS_BACK_LIMIT);
	if (date > today) return todayISO();
	if (date < min) return min.toISOString().slice(0, 10);
	return inputISO;
}

export function last7DaysFrom(selectedISO: string): string[] {
	const start = new Date(selectedISO);
	start.setHours(0, 0, 0, 0);
	const out: string[] = [];
	for (let i = 0; i < 7; i++) {
		const d = new Date(start);
		d.setDate(start.getDate() - i);
		out.push(d.toISOString().slice(0, 10));
	}
	return out.reverse();
}
