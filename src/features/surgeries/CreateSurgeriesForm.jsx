import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import dayjs from 'dayjs';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
import { useCreateSurgery } from './useCreateSurgery';
import { useUpdateSurgery } from './useUpdateSurgery';
import { useState } from 'react';
import RowPicker from '../../ui/RowPicker';

function CreateAppointmentForm({ surgeryToUpdate = {}, onCloseModal }) {
	const { id: updateId, ...updateValues } = surgeryToUpdate;
	const isEditSession = Boolean(updateId);
	const [date, setDate] = useState(surgeryToUpdate?.date ?? new Date());

	const { isCreating, createSurgery } = useCreateSurgery();
	const { isEditing, updateSurgery } = useUpdateSurgery();

	const isWorking = isCreating || isEditing;

	const { register, handleSubmit, reset, formState } = useForm({
		defaultValues: isEditSession ? updateValues : {},
	});

	const { errors } = formState;

	function onSubmit(data) {
		if (isEditSession) {
			updateSurgery(
				{ data: { ...data, date: date }, id: updateId },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
		} else {
			console.log(data);
			createSurgery(
				{ ...data, date: date },
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

	function onChange(date, dateString) {
		setDate(date);
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			type={onCloseModal ? 'modal' : 'regular'}>
			<FormRow label='Type' error={errors?.type?.message}>
				<Input
					type='text'
					id='name'
					autoComplete='off'
					disabled={isWorking}
					{...register('type', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow label='Total Amount' error={errors?.total_amount?.message}>
				<Input
					type='number'
					id='name'
					disabled={isWorking}
					{...register('total_amount', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow label='Amount' error={errors?.amount?.message}>
				<Input
					type='number'
					id='name'
					disabled={isWorking}
					{...register('amount', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<RowPicker
				label='When did the surgery happen?'
				defaultValue={
					isEditSession ? dayjs(surgeryToUpdate.date, 'YYYY-MM-DD') : dayjs()
				}
				format={'YYYY-MM-DD'}
				id='date'
				disabled={isWorking}
				onChange={onChange}
				getPopupContainer={triggerNode => {
					return triggerNode.parentNode;
				}}
			/>

			<FormRow>
				{/* NOTE: resets all inputs to their initial values */}
				<Button
					variation='secondary'
					type='reset'
					onClick={() => onCloseModal?.()}>
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isEditSession ? 'Edit value' : 'Create new Surgery'}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateAppointmentForm;
