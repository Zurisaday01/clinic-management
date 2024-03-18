import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createOrUpdateDoctor } from '../../services/apiDoctors';

export function useCreateDoctor() {
	const queryClient = useQueryClient();
	const { isLoading: isCreating, mutate: createDoctor } = useMutation({
		mutationFn: createOrUpdateDoctor,
		onSuccess: () => {
			// STEP 1 : send message
			toast.success('Doctor successfully created');
			// STEP 2: reload
			queryClient.invalidateQueries({
				queryKey: ['doctors'],
			});
		},
		onError: err => {
			toast.error(err);
		},
	});

	return { isCreating, createDoctor };
}
