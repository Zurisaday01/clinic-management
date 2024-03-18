import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrUpdateExpense } from '../../services/apiExpenses';
import { toast } from 'react-hot-toast';

export function useUpdateExpense() {
	const queryClient = useQueryClient();

	const { isLoading: isUpdating, mutate: updateExpense } = useMutation({
		mutationFn: ({ data, id }) => createOrUpdateExpense(data, id),
		onSuccess: () => {
			
			toast.success('Expense successfully edited');
			
			queryClient.invalidateQueries({
				queryKey: ['expenses'],
			});
		},
		onError: err => {
			toast.error(err);
		},
	});

	return { isUpdating, updateExpense };
}
