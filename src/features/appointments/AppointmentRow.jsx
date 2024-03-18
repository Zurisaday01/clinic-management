/* eslint-disable react/prop-types */
import styled from 'styled-components';

import Table from '../../ui/Table';

import { formatCurrency, formatDate } from '../../utils/helpers';
import Menus from '../../ui/Menus';
import { MdEdit, MdDelete } from 'react-icons/md';

import Modal from '../../ui/Modal';
import { useDeleteAppointment } from './useDeleteAppointment';
import ConfirmDelete from '../../ui/ConfirmDelete';
import CreateAppointmentForm from './CreateAppointmentForm';

const ID = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: 'Sono';
`;

const Amount = styled.div`
	font-family: 'Sono';
	font-weight: 500;
`;

const Stacked = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.2rem;

	& span:first-child {
		font-weight: 500;
	}

	& span:last-child {
		color: var(--color-grey-500);
		font-size: 1.2rem;
	}
`;

function AppointmentRow({ appointment }) {
	const {
		id: appointmentId,
		created_at,
		full_name,
		doctor: { full_name: doctorName },
		specialty: { name: specialtyName },
		age,
		amount,
		date,
	} = appointment;

	const { isDeleting, deleteAppointment } = useDeleteAppointment();

	return (
		<Table.Row>
			<ID>{appointmentId}</ID>

			<div>{full_name}</div>
			<div>{age}</div>
			<div>{doctorName}</div>
			<div>{specialtyName}</div>
			<Amount>{formatCurrency(amount)}</Amount>
			<div>
				<span>{formatDate(new Date(date))}</span>
			</div>

			<Modal>
				<Menus.Menu>
					<Menus.Toggle id={appointmentId} />

					<Menus.List id={appointmentId}>
						{/* EDIT */}
						<Modal.Open opens='update'>
							<Menus.Button icon={<MdEdit />}>Edit</Menus.Button>
						</Modal.Open>
						{/* DELETE */}
						<Modal.Open opens='delete'>
							<Menus.Button icon={<MdDelete />}>Delete</Menus.Button>
						</Modal.Open>
					</Menus.List>

					{/* WINDOWS ARE OUTSIDE OF THE MENU LIST */}
					<Modal.Window name='update'>
						<CreateAppointmentForm appointmentToUpdate={appointment} />
					</Modal.Window>

					<Modal.Window name='delete'>
						<ConfirmDelete
							resourceName='appointment'
							onConfirm={() => deleteAppointment(appointmentId)}
							disabled={isDeleting}
						/>
					</Modal.Window>
				</Menus.Menu>
			</Modal>
		</Table.Row>
	);
}

export default AppointmentRow;
