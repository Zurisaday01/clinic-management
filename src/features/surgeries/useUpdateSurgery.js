import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrUpdateSurgery } from '../../services/apiSurgeries';
import { toast } from 'react-hot-toast';

export function useUpdateSurgery() {
	const queryClient = useQueryClient();

	const { isLoading: isUpdating, mutate: updateSurgery } = useMutation({
		mutationFn: ({ data, id }) => createOrUpdateSurgery(data, id),
		onSuccess: () => {
			toast.success('Surgery successfully edited');
			
			queryClient.invalidateQueries({
				queryKey: ['surgeries'],
			});
		},
		onError: err => {
			toast.error(err);
		},
	});

	return { isUpdating, updateSurgery };
}
