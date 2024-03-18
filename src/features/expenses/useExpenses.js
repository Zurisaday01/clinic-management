import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getExpenses } from '../../services/apiExpenses';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useExpenses() {
	const [searchParams] = useSearchParams();
	const queryClient = useQueryClient();

	// FILTER
	const filterValue = searchParams.get('category');


	const filter =
		!filterValue || filterValue === 'all'
			? null
			: { field: 'category', value: filterValue };

	// SORT
	const sortByRaw = searchParams.get('sortBy') || 'date-asc';
	const [field, direction] = sortByRaw.split('-');
	
	const sortBy = { field, direction };

	const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

	// FETCHING
	const {
		data: { data: expenses, count } = {},
		isLoading,
		error,
	} = useQuery({
		queryKey: ['expenses', filter, sortBy, page],
		queryFn: () => getExpenses({ filter, sortBy, page }),
	});

	// PRE-FETCHING
	const pageCount = Math.ceil(count / PAGE_SIZE);

	// NEXT PAGE
	if (page < pageCount)
		queryClient.prefetchQuery({
			queryKey: ['expenses', filter, sortBy, page + 1],
			queryFn: () => getExpenses({ filter, sortBy, page: page + 1 }),
		});

	// PREV PAGE
	if (page > 1)
		queryClient.prefetchQuery({
			queryKey: ['expenses', filter, sortBy, page - 1],
			queryFn: () => getExpenses({ filter, sortBy, page: page - 1 }),
		});


	return { isLoading, error, expenses, count };
}

