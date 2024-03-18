import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteEmployee as deleteEmployeeApi } from '../../services/apiEmployees';

export function useDeleteEmployee() {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteEmployee } = useMutation({
		mutationFn: deleteEmployeeApi,
		onSuccess: () => {
			toast.success('Employee successfully deleted');

			queryClient.invalidateQueries({
				queryKey: ['employees'],
			});
		},
		onError: err => toast.error(err.message),
	});
	
	return { isDeleting, deleteEmployee };
}

/*
	NOTE: Mutations are actions that a user can do in your application. You can imagine a mutation as an action to change or create something.
	*/
