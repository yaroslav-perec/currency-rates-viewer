import { last7DaysFrom } from 'src/shared/utils/date';
import { useGetRatesByDateAndBaseQuery } from '../api/currencyApi';

export function useRatesForLast7Days(selectedDate: string, base: string) {
	const days = last7DaysFrom(selectedDate);

	// Call hooks individually — static list length ensures hook order stability
	const queries = [
		useGetRatesByDateAndBaseQuery({ date: days[0], base }),
		useGetRatesByDateAndBaseQuery({ date: days[1], base }),
		useGetRatesByDateAndBaseQuery({ date: days[2], base }),
		useGetRatesByDateAndBaseQuery({ date: days[3], base }),
		useGetRatesByDateAndBaseQuery({ date: days[4], base }),
		useGetRatesByDateAndBaseQuery({ date: days[5], base }),
		useGetRatesByDateAndBaseQuery({ date: days[6], base }),
	];

	const loading = queries.some((q) => q.isFetching);
	const error = queries.find((q) => q.error)?.error;
	const data = queries
		.map((q) => q.data)
		.filter(Boolean)
		.map((d) => ({
			date: d!.date,
			...d!.rates,
		}));

	return { data, loading, error };
}
