export type CurrencyCode = string;

export interface CurrenciesResponse {
	[code: CurrencyCode]: string;
}

interface CurrencyRates {
	[key: CurrencyCode]: number;
}

export interface RatesResponse {
	date: string;
	[key: CurrencyCode]: CurrencyRates | string;
}