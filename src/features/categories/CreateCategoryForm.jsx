import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
import { useCreateCategory } from './useCreateCategory';
import { useUpdateCategory } from './useUpdateCategory';

function CreateCategoryForm({ categoryToUpdate = {}, onCloseModal }) {
	const { id: updateId, ...updateValues } = categoryToUpdate;
	const isEditSession = Boolean(updateId);

	const { isCreating, createCategory } = useCreateCategory();
	const { isEditing, updateCategory } = useUpdateCategory();

	const isWorking = isCreating || isEditing;

	const { register, handleSubmit, reset, formState } = useForm({
		defaultValues: isEditSession ? updateValues : {},
	});

	const { errors } = formState;

	function onSubmit(data) {
		// the categories names have to have the next structure "Name Name"
		const { name } = data;
		data.name = name.replace(/\b\w/g, char => char.toUpperCase());
		if (isEditSession) {
			updateCategory(
				{ data, id: updateId },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
		} else {
			console.log(data);
			createCategory(data, {
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
					autoComplete='off'
					id='name'
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
					{isEditSession ? 'Edit value' : 'Create new Category'}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCategoryForm;
