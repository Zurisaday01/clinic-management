import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createOrUpdateSpecialty } from '../../services/apiSpecialties';

export function useCreateSpecialty() {
	const queryClient = useQueryClient();
	const { isLoading: isCreating, mutate: createSpecialty } = useMutation({
		mutationFn: createOrUpdateSpecialty,
		onSuccess: () => {
			// STEP 1 : send message
			toast.success('Specialty successfully created');
			// STEP 2: reload
			queryClient.invalidateQueries({
				queryKey: ['specialties'],
			});
		},
		onError: err => {
			toast.error(err);
		},
	});

	return { isCreating, createSpecialty };
}
