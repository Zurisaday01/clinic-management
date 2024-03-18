import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import dayjs from 'dayjs';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
import { useCreatePayment } from './useCreatePayment';
import { useUpdatePayment } from './useUpdatePayment';
import { useState } from 'react';
import SelectEmployee from '../employees/SelectEmployee';
import { useEmployees } from '../employees/useEmployees';
import RowPicker from '../../ui/RowPicker';

function CreatePaymentForm({ paymentToUpdate = {}, onCloseModal }) {
	const { id: updateId, ...updateValues } = paymentToUpdate;

	const { employees, isLoading } = useEmployees();
	const isEditSession = Boolean(updateId);
	const [date, setDate] = useState(paymentToUpdate?.date ?? new Date());
	const [employee, setEmployee] = useState(paymentToUpdate?.employee?.id);

	const { isCreating, createPayment } = useCreatePayment();
	const { isEditing, updatePayment } = useUpdatePayment();

	const isWorking = isCreating || isEditing;

	const { register, handleSubmit, reset, formState } = useForm({
		defaultValues: isEditSession ? updateValues : {},
	});

	console.log(paymentToUpdate.date)

	const { errors } = formState;

	function onSubmit(data) {
		if (isEditSession) {
			updatePayment(
				{ data: { ...data, employee: employee, date: date }, id: updateId },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
		} else {
			createPayment(
				{ ...data, employee: employee ?? employees?.[0]?.id, date: date },
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
			<FormRow label='Full Name' error={errors?.name?.message}>
				<SelectEmployee
					employee={employee}
					setEmployee={setEmployee}
					isEditSession={isEditSession}
				/>
			</FormRow>
			<FormRow label='Amount' error={errors?.amount?.message}>
				<Input
					type='number'
					id='amount'
					disabled={isWorking}
					{...register('amount', {
						required: 'This field is required',
					})}
				/>
			</FormRow>
			<RowPicker
				label='When did you pay him/her?'
				defaultValue={
					isEditSession ? dayjs(paymentToUpdate.date, 'YYYY-MM-DD') : dayjs()
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
					{isEditSession ? 'Edit value' : 'Pay my Employee'}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreatePaymentForm;
