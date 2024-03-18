import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrUpdateAppointment } from '../../services/apiAppointment';
import { toast } from 'react-hot-toast';

export function useUpdateAppointment() {
	const queryClient = useQueryClient();

	const { isLoading: isUpdating, mutate: updateAppointment } = useMutation({
		mutationFn: ({ data, id }) => createOrUpdateAppointment(data, id),
		onSuccess: () => {
			
			toast.success('Appointment successfully edited');
			
			queryClient.invalidateQueries({
				queryKey: ['appointments'],
			});
		},
		onError: err => {
			toast.error(err);
		},
	});

	return { isUpdating, updateAppointment };
}
