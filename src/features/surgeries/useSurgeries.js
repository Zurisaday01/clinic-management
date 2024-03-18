import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getSurgeries } from '../../services/apiSurgeries';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useSurgeries() {
	const [searchParams] = useSearchParams();
	const queryClient = useQueryClient();


	const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

	// FETCHING
	const {
		data: { data: surgeries, count } = {},
		isLoading,
		error,
	} = useQuery({
		queryKey: ['surgeries', page],
		queryFn: () => getSurgeries({ page }),
	});

	// PRE-FETCHING
	const pageCount = Math.ceil(count / PAGE_SIZE);

	// NEXT PAGE
	if (page < pageCount)
		queryClient.prefetchQuery({
			queryKey: ['surgeries', page + 1],
			queryFn: () => getSurgeries({ page: page + 1 }),
		});

	// PREV PAGE
	if (page > 1)
		queryClient.prefetchQuery({
			queryKey: ['surgeries', page - 1],
			queryFn: () => getSurgeries({ page: page - 1 }),
		});


	return { isLoading, error, surgeries, count };
}

