import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrUpdateCategory } from '../../services/apiCategories';
import { toast } from 'react-hot-toast';

export function useUpdateCategory() {
	const queryClient = useQueryClient();

	const { isLoading: isUpdating, mutate: updateCategory } = useMutation({
		mutationFn: ({ data, id }) => createOrUpdateCategory(data, id),
		onSuccess: () => {
			// STEP 1 : send message
			toast.success('Category successfully edited');
			// STEP 2: reload
			queryClient.invalidateQueries({
				queryKey: ['categories'],
			});
		},
		onError: err => {
			toast.error(err);
		},
	});

	return { isUpdating, updateCategory };
}
