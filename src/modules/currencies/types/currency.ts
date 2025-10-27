export type CurrencyCode = string;

export interface CurrenciesResponse {
  [code: CurrencyCode]: string;
}

export interface RatesResponse {
  date: string;
  [base: CurrencyCode]: Record<string, number> | string;
}

export interface RatesRequestParams {
  date: string;
  base: CurrencyCode;
}
