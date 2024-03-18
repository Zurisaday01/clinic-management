import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSurgery as deleteSurgeryApi } from '../../services/apiSurgeries';
import { toast } from 'react-hot-toast';

export function useDeleteSurgery() {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteSurgery } = useMutation({
		mutationFn: deleteSurgeryApi,
		onSuccess: () => {
			toast.success('Surgery successfully deleted');

			queryClient.invalidateQueries({
				queryKey: ['surgeries'],
			});
		},
		onError: err => toast.error(err.message),
	});

	return { isDeleting, deleteSurgery };
}
