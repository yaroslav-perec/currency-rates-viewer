export interface TableRateRow {
  date: string;
  rates: Record<string, number>;
}

export type Order = 'asc' | 'desc';
