import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAppointments } from '../../services/apiAppointment';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useAppointments() {
	const [searchParams] = useSearchParams();
	const queryClient = useQueryClient();


	const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

	// FETCHING
	const {
		data: { data: appointments, count } = {},
		isLoading,
		error,
	} = useQuery({
		queryKey: ['appointments', page],
		queryFn: () => getAppointments({ page }),
	});

	// PRE-FETCHING
	const pageCount = Math.ceil(count / PAGE_SIZE);

	// NEXT PAGE
	if (page < pageCount)
		queryClient.prefetchQuery({
			queryKey: ['appointments', page + 1],
			queryFn: () => getAppointments({ page: page + 1 }),
		});

	// PREV PAGE
	if (page > 1)
		queryClient.prefetchQuery({
			queryKey: ['appointments', page - 1],
			queryFn: () => getAppointments({ page: page - 1 }),
		});


	return { isLoading, error, appointments, count };
}

