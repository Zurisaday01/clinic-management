/* eslint-disable react/prop-types */
import styled from 'styled-components';

import Table from '../../ui/Table';

import { formatCurrency, formatDate } from '../../utils/helpers';
import Menus from '../../ui/Menus';
import { MdEdit, MdDelete } from 'react-icons/md';

import Modal from '../../ui/Modal';
import { useDeleteSurgery } from './useDeleteSurgery';
import ConfirmDelete from '../../ui/ConfirmDelete';
import CreateSurgeriesForm from './CreateSurgeriesForm';

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

function SurgeryRow({ surgery }) {
	const { id: surgeryId, type, total_amount, amount, date } = surgery;

	const { isDeleting, deleteSurgery } = useDeleteSurgery();

	return (
		<Table.Row>
			<ID>{surgeryId}</ID>

			<div>{type}</div>
			<Amount>{formatCurrency(total_amount)}</Amount>
			<Amount>{formatCurrency(amount)}</Amount>
			<div>
				<span>{formatDate(new Date(date))}</span>
			</div>

			<Modal>
				<Menus.Menu>
					<Menus.Toggle id={surgeryId} />

					<Menus.List id={surgeryId}>
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
						<CreateSurgeriesForm surgeryToUpdate={surgery} />
					</Modal.Window>

					<Modal.Window name='delete'>
						<ConfirmDelete
							resourceName='surgery'
							onConfirm={() => deleteSurgery(surgeryId)}
							disabled={isDeleting}
						/>
					</Modal.Window>
				</Menus.Menu>
			</Modal>
		</Table.Row>
	);
}

export default SurgeryRow;
