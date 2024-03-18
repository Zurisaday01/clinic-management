/* eslint-disable react/prop-types */
import styled from 'styled-components';
import Modal from '../../ui/Modal';
import CreateDoctorForm from './CreateDoctorForm';
import { useDeleteDoctor } from './useDeleteDoctor';
import { MdEdit, MdDelete } from 'react-icons/md';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

const Id = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: 'Sono';
`;

function DoctorRow({ doctor }) {
	const {
		id: doctorId,
		full_name,
		phone,
		specialty: { name: specialtyName },
	} = doctor || {};

	const { isDeleting, deleteDoctor } = useDeleteDoctor();

	if (doctor)
		return (
			<>
				<Table.Row>
					<Id>{doctorId}</Id>
					<div>{full_name}</div>
					<div>{phone}</div>
					<div>{specialtyName}</div>
					<div>
						{/* Could be either the Modal first or Menus.Menu */}
						<Modal>
							<Menus.Menu>
								<Menus.Toggle id={doctorId} />

								<Menus.List id={doctorId}>
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
									<CreateDoctorForm doctorToUpdate={doctor} />
								</Modal.Window>

								<Modal.Window name='delete'>
									<ConfirmDelete
										resourceName='doctor'
										onConfirm={() => deleteDoctor(doctorId)}
										disabled={isDeleting}
									/>
								</Modal.Window>
							</Menus.Menu>
						</Modal>
					</div>
				</Table.Row>
			</>
		);
}

export default DoctorRow;
