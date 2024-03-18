import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePayment as deletePaymentApi } from '../../services/apiPayment';
import { toast } from 'react-hot-toast';

export function useDeletePayment() {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deletePayment } = useMutation({
		mutationFn: deletePaymentApi,
		onSuccess: () => {
			toast.success('Payment successfully deleted');

			queryClient.invalidateQueries({
				queryKey: ['payments'],
			});
		},
		onError: err => toast.error(err.message),
	});

	return { isDeleting, deletePayment };
}
