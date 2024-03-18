import { useQuery } from '@tanstack/react-query';
import { getSpecialties } from '../../services/apiSpecialties';

export function useSpecialties() {
	const {
		data: specialties,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['specialties'],
		queryFn: getSpecialties,
	});

	return { isLoading, error, specialties };
}
