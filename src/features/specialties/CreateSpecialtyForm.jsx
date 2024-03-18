import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
import { useCreateSpecialty } from './useCreateSpecialty';
import { useUpdateSpecialty } from './useUpdateSpecialty';

function CreateSpecialtyForm({ specialtyToUpdate = {}, onCloseModal }) {
	const { id: updateId, ...updateValues } = specialtyToUpdate;
	const isEditSession = Boolean(updateId);

	const { isCreating, createSpecialty } = useCreateSpecialty();
	const { isEditing, updateSpecialty } = useUpdateSpecialty();

	const isWorking = isCreating || isEditing;

	const { register, handleSubmit, reset, formState } = useForm({
		defaultValues: isEditSession ? updateValues : {},
	});

	const { errors } = formState;

	function onSubmit(data) {
		if (isEditSession) {
			updateSpecialty(
				{ data, id: updateId },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
		} else {
			createSpecialty(data, {
				onSuccess: () => {
					reset();
					onCloseModal?.();
				},
			});
		}
	}

	function onError(errors) {
		console.log(errors);
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			type={onCloseModal ? 'modal' : 'regular'}>
			<FormRow label='Name' error={errors?.name?.message}>
				<Input
					type='text'
					id='name'
					autoComplete='off'
					disabled={isWorking}
					{...register('name', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow>
				<Button
					variation='secondary'
					type='reset'
					onClick={() => onCloseModal?.()}>
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isEditSession ? 'Edit value' : 'Create new Specialty'}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateSpecialtyForm;
