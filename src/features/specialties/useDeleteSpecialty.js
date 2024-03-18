import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteSpecialty as deleteSpecialtyApi } from '../../services/apiSpecialties';

export function useDeleteSpecialty() {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteSpecialty } = useMutation({
		mutationFn: deleteSpecialtyApi,
		onSuccess: () => {
			toast.success('Specialty successfully deleted');

			queryClient.invalidateQueries({
				queryKey: ['specialties'],
			});
		},
		onError: err => toast.error(err.message),
	});
	
	return { isDeleting, deleteSpecialty };
}
