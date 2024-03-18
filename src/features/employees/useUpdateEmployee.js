import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrUpdateEmployee } from '../../services/apiEmployees';
import { toast } from 'react-hot-toast';

export function useUpdateEmployee() {
	const queryClient = useQueryClient();

	const { isLoading: isUpdating, mutate: updateEmployee } = useMutation({
		mutationFn: ({ data, id }) => createOrUpdateEmployee(data, id),
		onSuccess: () => {
			// STEP 1 : send message
			toast.success('Employee successfully edited');
			// STEP 2: reload
			queryClient.invalidateQueries({
				queryKey: ['employees'],
			});
		},
		onError: err => {
			toast.error(err);
		},
	});

	return { isUpdating, updateEmployee };
}
