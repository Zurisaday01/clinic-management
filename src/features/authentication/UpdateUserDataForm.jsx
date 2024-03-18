import { useState } from 'react';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

import { useUser } from './useUser';
import { useUpdateUser } from './useUpdateUser';

function UpdateUserDataForm() {
	// We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
	const { user } = useUser();

	const { email, user_metadata } = user;

	const currentFullName = user_metadata?.fullName;

	const { isUpdating, updateUser } = useUpdateUser();

	const [fullName, setFullName] = useState(currentFullName);

	function handleSubmit(e) {
		e.preventDefault();
		if (!fullName) return;

		updateUser({ fullName }, { onSuccess: e.target.reset() });
	}

	function handleCancel() {
		setFullName(currentFullName);
		setAvatar(null);
	}

	return (
		<Form onSubmit={handleSubmit}>
			<FormRow label='Email address'>
				<Input value={email} disabled />
			</FormRow>
			<FormRow label='Full name'>
				<Input
					type='text'
					value={fullName}
					autoComplete='off'
					disabled={isUpdating}
					onChange={e => setFullName(e.target.value)}
					id='fullName'
				/>
			</FormRow>
			<FormRow>
				<Button
					type='reset'
					$variation='secondary'
					disabled={isUpdating}
					onClick={handleCancel}>
					Cancel
				</Button>
				<Button disabled={isUpdating}>Update account</Button>
			</FormRow>
		</Form>
	);
}

export default UpdateUserDataForm;
