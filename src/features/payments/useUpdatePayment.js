import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrUpdatePayment } from '../../services/apiPayment';
import { toast } from 'react-hot-toast';

export function useUpdatePayment() {
	const queryClient = useQueryClient();

	const { isLoading: isUpdating, mutate: updatePayment } = useMutation({
		mutationFn: ({ data, id }) => createOrUpdatePayment(data, id),
		onSuccess: () => {
			
			toast.success('Payment successfully edited');
			
			queryClient.invalidateQueries({
				queryKey: ['payments'],
			});
		},
		onError: err => {
			toast.error(err);
		},
	});

	return { isUpdating, updatePayment };
}
