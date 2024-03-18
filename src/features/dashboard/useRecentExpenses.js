import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { subDays } from 'date-fns';
import { getExpensesAfterDate } from '../../services/apiExpenses';

export function useRecentExpenses() {
	const [searchParams] = useSearchParams();

	const numDays = !searchParams.get('last')
		? 7
		: Number(searchParams.get('last'));

	// Subtract the specified number of days from the given date.
	const queryDate = subDays(new Date(), numDays).toISOString();

	const { isLoading, data: expenses } = useQuery({
		queryFn: () => getExpensesAfterDate(queryDate),
		queryKey: ['recentExpenses', `last-${numDays}`],
	});

	return { isLoading, expenses};
}
