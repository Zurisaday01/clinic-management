import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import dayjs from 'dayjs';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
import Textarea from '../../ui/Textarea';
import { useCreateExpense } from './useCreateExpense';
import { useUpdateExpense } from './useUpdateExpense';
import { useState } from 'react';
import SelectCategory from '../categories/SelectCategory';
import { useCategories } from '../categories/useCategories';
import RowPicker from '../../ui/RowPicker';

function CreateExpenseForm({ expenseToUpdate = {}, onCloseModal }) {
	const { id: updateId, ...updateValues } = expenseToUpdate;

	const { categories, isLoading } = useCategories();
	const isEditSession = Boolean(updateId);
	const [date, setDate] = useState(expenseToUpdate?.date ?? new Date());
	const [category, setCategory] = useState(expenseToUpdate?.category?.id);

	const { isCreating, createExpense } = useCreateExpense();
	const { isEditing, updateExpense } = useUpdateExpense();

	const isWorking = isCreating || isEditing;

	const { register, handleSubmit, reset, formState } = useForm({
		defaultValues: isEditSession ? updateValues : {},
	});

	const { errors } = formState;

	function onSubmit(data) {
		if (isEditSession) {
			updateExpense(
				{ data: { ...data, category: category, date: date }, id: updateId },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
		} else {
			createExpense(
				{ ...data, category: category ?? categories?.[0]?.id, date: date },
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

			<FormRow label='Category' error={errors?.category?.message}>
				<SelectCategory
					category={category}
					setCategory={setCategory}
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
				label='When did it happen?'
				defaultValue={
					isEditSession ? dayjs(expenseToUpdate.date, 'YYYY-MM-DD') : dayjs()
				}
				format={'YYYY-MM-DD'}
				id='date'
				disabled={isWorking}
				onChange={onChange}
				getPopupContainer={triggerNode => {
					return triggerNode.parentNode;
				}}
			/>

			<FormRow
				label='Description (optional)'
				error={errors?.description?.message}>
				<Textarea
					type='number'
					id='description'
					defaultValue=''
					disabled={isWorking}
					{...register('description')}
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
					{isEditSession ? 'Edit value' : 'Create new Expense'}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateExpenseForm;
