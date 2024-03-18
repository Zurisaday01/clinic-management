import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrUpdateSpecialty } from '../../services/apiSpecialties';
import { toast } from 'react-hot-toast';

export function useUpdateSpecialty() {
	const queryClient = useQueryClient();

	const { isLoading: isUpdating, mutate: updateSpecialty } = useMutation({
		mutationFn: ({ data, id }) => createOrUpdateSpecialty(data, id),
		onSuccess: () => {
			// STEP 1 : send message
			toast.success('Specialty successfully edited');
			// STEP 2: reload
			queryClient.invalidateQueries({
				queryKey: ['specialties'],
			});
		},
		onError: err => {
			toast.error(err);
		},
	});

	return { isUpdating, updateSpecialty };
}
