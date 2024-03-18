import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createOrUpdateExpense } from '../../services/apiExpenses';

export function useCreateExpense() {
	const queryClient = useQueryClient();
	const { isLoading: isCreating, mutate: createExpense } = useMutation({
		mutationFn: createOrUpdateExpense,
		onSuccess: () => {
			
			toast.success('Expense successfully created');
		
			queryClient.invalidateQueries({
				queryKey: ['expenses'],
			});
		},
		onError: err => {
			toast.error(err);
		},
	});

	return { isCreating, createExpense };
}
