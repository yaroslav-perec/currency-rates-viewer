export interface TableRateRow {
	date: string;
	[key: string]: string | number;
}

export type Order = 'asc' | 'desc';