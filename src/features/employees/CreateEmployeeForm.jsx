import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
import { useCreateEmployee } from './useCreateEmployee';
import { useUpdateEmployee } from './useUpdateEmployee';
import Select from '../../ui/Select';
import { useState } from 'react';

function CreateEmployeeForm({ employeeToUpdate = {}, onCloseModal }) {
	const { id: updateId, ...updateValues } = employeeToUpdate;
	const isEditSession = Boolean(updateId);

	const { isCreating, createEmployee } = useCreateEmployee();
	const { isEditing, updateEmployee } = useUpdateEmployee();
	const [status, setStatus] = useState(employeeToUpdate?.status ?? 'active');

	//NOTE: disable you are either creating or editing
	const isWorking = isCreating || isEditing;

	// NOTE: register each input
	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isEditSession ? updateValues : {},
	});

	// NOTE: the errors come from the fromState to show feedback
	const { errors } = formState;

	// NOTE: data = values of inputs
	function onSubmit(data) {
		// NOTE: id comes from employeeToUpdate
		if (isEditSession) {
			updateEmployee(
				{ data: { ...data, status: status }, id: updateId },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
		} else {
			createEmployee(
				{ ...data, status: status },
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

	function handleChangeTime(e) {
		setStatus(e.target.value);
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			type={onCloseModal ? 'modal' : 'regular'}>
			<FormRow label='Full name' error={errors?.full_name?.message}>
				<Input
					type='text'
					id='fullName'
					autoComplete='off'
					disabled={isWorking}
					{...register('full_name', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow label='Job title' error={errors?.job_title?.message}>
				<Input
					type='text'
					autoComplete='off'
					id='jobTitle'
					disabled={isWorking}
					{...register('job_title', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow label='Salary' error={errors?.salary?.message}>
				<Input
					type='number'
					id='salary'
					disabled={isWorking}
					{...register('salary', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Salary shoud be at least 1',
						},
					})}
				/>
			</FormRow>

			<FormRow label='Status' error={errors?.status?.message}>
				<Select
					id='status'
					value={status}
					options={[
						{ value: 'active', label: 'Active' },
						{ value: 'inactive', label: 'Inactive' },
					]}
					onChange={handleChangeTime}
				/>
			</FormRow>

			<FormRow>
				{/* NOTE: resets all inputs to their initial values */}
				<Button
					variation='secondary'
					type='reset'
					onClick={() => onCloseModal?.()}>
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isEditSession ? 'Edit value' : 'Create new employee'}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateEmployeeForm;
