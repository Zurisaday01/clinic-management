/* eslint-disable react/prop-types */
import styled from 'styled-components';
import Modal from '../../ui/Modal';
import CreateSpecialtyForm from './CreateSpecialtyForm';
import { useDeleteSpecialty } from './useDeleteSpecialty';
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

function SpecialtyRow({ specialty }) {
	const { id: specialtyId, name } = specialty || {};
	const { isDeleting, deleteSpecialty } = useDeleteSpecialty();

	if (specialty)
		return (
			<>
				<Table.Row>
					<Id>{specialtyId}</Id>
					<div>{name}</div>
					<div>
						{/* Could be either the Modal first or Menus.Menu */}
						<Modal>
							<Menus.Menu>
								<Menus.Toggle id={specialtyId} />

								<Menus.List id={specialtyId}>
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
									<CreateSpecialtyForm specialtyToUpdate={specialty} />
								</Modal.Window>

								<Modal.Window name='delete'>
									<ConfirmDelete
										resourceName='specialty'
										onConfirm={() => deleteSpecialty(specialtyId)}
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

export default SpecialtyRow;
