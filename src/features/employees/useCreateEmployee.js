import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createOrUpdateEmployee } from '../../services/apiEmployees';

export function useCreateEmployee() {
	const queryClient = useQueryClient();
	const { isLoading: isCreating, mutate: createEmployee } = useMutation({
		mutationFn: createOrUpdateEmployee,
		onSuccess: () => {
			// STEP 1 : send message
			toast.success('Employee successfully created');
			// STEP 2: reload
			queryClient.invalidateQueries({
				queryKey: ['employees'],
			});
		},
		onError: err => {
			toast.error(err);
		},
	});

	return { isCreating, createEmployee };
}
