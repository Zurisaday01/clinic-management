import { useQuery } from '@tanstack/react-query';
import { getDoctors } from '../../services/apiDoctors';

export function useDoctors() {
	const {
		data: doctors,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['doctors'],
		queryFn: getDoctors,
	});

	return { isLoading, error, doctors };
}
