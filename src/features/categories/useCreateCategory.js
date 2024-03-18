import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createOrUpdateCategory } from '../../services/apiCategories';

export function useCreateCategory() {
	const queryClient = useQueryClient();
	const { isLoading: isCreating, mutate: createCategory } = useMutation({
		mutationFn: createOrUpdateCategory,
		onSuccess: () => {
			// STEP 1 : send message
			toast.success('Caregory successfully created');
			// STEP 2: reload
			queryClient.invalidateQueries({
				queryKey: ['categories'],
			});
		},
		onError: err => {
			toast.error(err);
		},
	});

	return { isCreating, createCategory };
}
