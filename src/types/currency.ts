
export type CurrencyCode = string;

export interface CurrenciesResponse {
	[code: string]: string;
}

export interface RatesResponse {
	date: string;
	[key: string]: unknown;
}

