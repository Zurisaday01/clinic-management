import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../../services/apiCategories';

export function useCategories() {
	const {
		data: categories,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['categories'],
		queryFn: getCategories,
	});

	return { isLoading, error, categories };
}
