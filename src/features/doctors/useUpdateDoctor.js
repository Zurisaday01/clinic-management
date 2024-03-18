import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrUpdateDoctor } from '../../services/apiDoctors';
import { toast } from 'react-hot-toast';

export function useUpdateDoctor() {
	const queryClient = useQueryClient();

	const { isLoading: isUpdating, mutate: updateDoctor } = useMutation({
		mutationFn: ({ data, id }) => createOrUpdateDoctor(data, id),
		onSuccess: () => {
			// STEP 1 : send message
			toast.success('Doctor successfully edited');
			// STEP 2: reload
			queryClient.invalidateQueries({
				queryKey: ['doctors'],
			});
		},
		onError: err => {
			toast.error(err);
		},
	});

	return { isUpdating, updateDoctor };
}
