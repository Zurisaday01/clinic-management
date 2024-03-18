import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import dayjs from 'dayjs';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
import { useCreateAppointment } from './useCreateAppointment';
import { useUpdateAppointment } from './useUpdateAppointment';
import { useState } from 'react';
import SelectDoctor from '../doctors/SelectDoctor';
import SelectSpecialty from '../specialties/SelectSpecialty';
import { useSpecialties } from '../specialties/useSpecialties';
import Select from '../../ui/Select';
import { useDoctors } from '../doctors/useDoctors';
import { useSettings } from '../settings/useSettings';
import RowPicker from '../../ui/RowPicker';

function CreateAppointmentForm({ appointmentToUpdate = {}, onCloseModal }) {
	const { id: updateId, ...updateValues } = appointmentToUpdate;

	const [partOfDay, setPartOfDay] = useState(
		appointmentToUpdate?.time ?? 'day'
	);

	const [date, setDate] = useState(appointmentToUpdate?.date ?? new Date());

	const { specialties } = useSpecialties();
	const { doctors } = useDoctors();
	const { settings } = useSettings();

	const isEditSession = Boolean(updateId);
	const [specialty, setSpecialty] = useState(
		appointmentToUpdate?.specialty?.id
	);
	const [doctor, setDoctor] = useState(appointmentToUpdate?.doctor?.id);

	const { isCreating, createAppointment } = useCreateAppointment();
	const { isEditing, updateAppointment } = useUpdateAppointment();

	const isWorking = isCreating || isEditing;

	const { register, handleSubmit, reset, formState } = useForm({
		defaultValues: isEditSession ? updateValues : {},
	});

	const { errors } = formState;

	function onSubmit(data) {
		if (isEditSession) {
			updateAppointment(
				{
					data: {
						...data,
						specialty: specialty,
						doctor: doctor,
						amount: settings?.['net_' + partOfDay],
						time: partOfDay,
						date: date,
					},
					id: updateId,
				},
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
		} else {
			createAppointment(
				{
					...data,
					specialty: specialty ?? specialties?.[0]?.id,
					doctor: doctor ?? doctors?.[0]?.id,
					amount: settings?.['net_' + partOfDay],
					time: partOfDay,
					date: date,
				},
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
		setPartOfDay(e.target.value);
	}

	function onChange(date) {
		setDate(date);
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			type={onCloseModal ? 'modal' : 'regular'}>
			<FormRow label="Patient's full name" error={errors?.full_name?.message}>
				<Input
					type='text'
					id='name'
					autoComplete='off'
					disabled={isWorking}
					{...register('full_name', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow label="Patient's age" error={errors?.age?.message}>
				<Input
					type='number'
					id='age'
					disabled={isWorking}
					{...register('age', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow label='Doctor'>
				<SelectDoctor
					doctor={doctor}
					setDoctor={setDoctor}
					isEditSession={isEditSession}
				/>
			</FormRow>

			<FormRow label='Specialty'>
				<SelectSpecialty
					specialty={specialty}
					setSpecialty={setSpecialty}
					isEditSession={isEditSession}
				/>
			</FormRow>

			<FormRow label='Part of day'>
				<Select
					id='part-day'
					value={partOfDay}
					options={[
						{ value: 'day', label: 'Day' },
						{ value: 'night', label: 'Night' },
					]}
					onChange={handleChangeTime}
				/>
			</FormRow>

			<RowPicker
				label='When did it happen?'
				defaultValue={isEditSession ? dayjs(appointmentToUpdate.date) : dayjs()}
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
					{isEditSession ? 'Edit value' : 'Create new Appointment'}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateAppointmentForm;
