import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteExpense as deleteExpenseApi } from '../../services/apiExpenses';
import { toast } from 'react-hot-toast';

export function useDeleteExpense() {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteExpense } = useMutation({
		mutationFn: deleteExpenseApi,
		onSuccess: () => {
			toast.success('Expenses successfully deleted');

			queryClient.invalidateQueries({
				queryKey: ['expenses'],
			});
		},
		onError: err => toast.error(err.message),
	});

	return { isDeleting, deleteExpense };
}
