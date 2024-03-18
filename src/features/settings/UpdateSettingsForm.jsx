import { useSettings } from './useSettings';

import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useUpdateSetting } from './useUpdateSetting';

function UpdateSettingsForm() {
	const { isLoading, settings } = useSettings();

	const { net_day, net_night } = settings || {};

	const { isUpdating, updateSetting } = useUpdateSetting();

	// return <Spinner />;
	if (isLoading) return <Spinner />;

	function handleBlur(e, field) {
		const { value } = e.target;

		if (!value) return;
		updateSetting({ [field]: value });
	}

	// This time we are using UNCONTROLLED fields, so we will NOT store state
	return (
		<Form>
			<FormRow label="Net price for day's appointments">
				<Input
					type='number'
					defaultValue={net_day}
					onBlur={e => handleBlur(e, 'net_day')}
					disabled={isUpdating}
					id='net-day'
				/>
			</FormRow>
			<FormRow label="Net price for night's appointments">
				<Input
					type='number'
					defaultValue={net_night}
					onBlur={e => handleBlur(e, 'net_night')}
					disabled={isUpdating}
					id='net-night'
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
