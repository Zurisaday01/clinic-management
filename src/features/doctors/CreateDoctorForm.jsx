import { useForm } from 'react-hook-form';
import { useState } from 'react';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
import { useCreateDoctor } from './useCreateDoctor';
import { useUpdateDoctor } from './useUpdateDoctor';
import SelectSpecialty from '../specialties/SelectSpecialty';
import { useSpecialties } from '../specialties/useSpecialties';

function CreateDoctorForm({ doctorToUpdate = {}, onCloseModal }) {
	const { id: updateId, ...updateValues } = doctorToUpdate;
	const isEditSession = Boolean(updateId);

	const { isCreating, createDoctor } = useCreateDoctor();
	const { isEditing, updateDoctor } = useUpdateDoctor();
	const { specialties } = useSpecialties();
	const [specialty, setSpecialty] = useState(doctorToUpdate?.specialty?.id);

	const isWorking = isCreating || isEditing;

	const { register, handleSubmit, reset, formState } = useForm({
		defaultValues: isEditSession ? updateValues : {},
	});

	const { errors } = formState;

	function onSubmit(data) {
		if (isEditSession) {
			updateDoctor(
				{ data: { ...data, specialty: specialty }, id: updateId },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
		} else {
			createDoctor(
				{ ...data, specialty: specialty ?? specialties?.[0]?.id },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
		}
	}

	function onError(errors) {
		console.log(errors);
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			type={onCloseModal ? 'modal' : 'regular'}>
			<FormRow label='Full name' error={errors?.full_name?.message}>
				<Input
					type='text'
					autoComplete='off'
					id='fullName'
					disabled={isWorking}
					{...register('full_name', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow label='Phone' error={errors?.phone?.message}>
				<Input
					type='text'
					id='phone'
					autoComplete='off'
					disabled={isWorking}
					{...register('phone', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow label='Specialty' error={errors?.type?.message}>
				<SelectSpecialty
					specialty={specialty}
					setSpecialty={setSpecialty}
					isEditSession={isEditSession}
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
					{isEditSession ? 'Edit value' : 'Create new doctor'}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateDoctorForm;
