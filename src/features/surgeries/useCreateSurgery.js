import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createOrUpdateSurgery } from '../../services/apiSurgeries';

export function useCreateSurgery() {
	const queryClient = useQueryClient();
	const { isLoading: isCreating, mutate: createSurgery } = useMutation({
		mutationFn: createOrUpdateSurgery,
		onSuccess: () => {
			
			toast.success('Surgery successfully created');
		
			queryClient.invalidateQueries({
				queryKey: ['surgeries'],
			});
		},
		onError: err => {
			toast.error(err);
		},
	});

	return { isCreating, createSurgery };
}
