import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createOrUpdatePayment } from '../../services/apiPayment';

export function useCreatePayment() {
	const queryClient = useQueryClient();
	const { isLoading: isCreating, mutate: createPayment } = useMutation({
		mutationFn: createOrUpdatePayment,
		onSuccess: () => {
			
			toast.success('Payment successfully created');
		
			queryClient.invalidateQueries({
				queryKey: ['payments'],
			});
		},
		onError: err => {
			toast.error(err);
		},
	});

	return { isCreating, createPayment };
}
