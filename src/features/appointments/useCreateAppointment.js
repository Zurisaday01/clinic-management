import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createOrUpdateAppointment } from '../../services/apiAppointment';

export function useCreateAppointment() {
	const queryClient = useQueryClient();
	const { isLoading: isCreating, mutate: createAppointment } = useMutation({
		mutationFn: createOrUpdateAppointment,
		onSuccess: () => {
			
			toast.success('Appointment successfully created');
		
			queryClient.invalidateQueries({
				queryKey: ['appointments'],
			});
		},
		onError: err => {
			toast.error(err);
		},
	});

	return { isCreating, createAppointment };
}
