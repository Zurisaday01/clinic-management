import { useQuery } from '@tanstack/react-query';
import { getEmployees } from '../../services/apiEmployees';

export function useEmployees() {
	const {
		data: employees,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['employees'],
		queryFn: getEmployees,
	});

	return { isLoading, error, employees };
}
