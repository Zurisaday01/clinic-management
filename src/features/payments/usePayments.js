import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPayments } from '../../services/apiPayment';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function usePayments() {
	const [searchParams] = useSearchParams();
	const queryClient = useQueryClient();

	// SORT
	const sortByRaw = searchParams.get('sortBy') || 'date-asc';
	const [field, direction] = sortByRaw.split('-');
	
	const sortBy = { field, direction };

	const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

	// FETCHING
	const {
		data: { data: payments, count } = {},
		isLoading,
		error,
	} = useQuery({
		queryKey: ['payments', sortBy, page],
		queryFn: () => getPayments({ sortBy, page }),
	});

	// PRE-FETCHING
	const pageCount = Math.ceil(count / PAGE_SIZE);

	// NEXT PAGE
	if (page < pageCount)
		queryClient.prefetchQuery({
			queryKey: ['payments', sortBy, page + 1],
			queryFn: () => getPayments({ sortBy, page: page + 1 }),
		});

	// PREV PAGE
	if (page > 1)
		queryClient.prefetchQuery({
			queryKey: ['payments', sortBy, page - 1],
			queryFn: () => getPayments({ sortBy, page: page - 1 }),
		});


	return { isLoading, error, payments, count };
}

