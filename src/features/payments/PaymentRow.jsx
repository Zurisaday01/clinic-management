/* eslint-disable react/prop-types */
import styled from 'styled-components';

import Table from '../../ui/Table';

import { formatCurrency, formatDate } from '../../utils/helpers';
import Menus from '../../ui/Menus';
import { MdEdit, MdDelete } from 'react-icons/md';

import Modal from '../../ui/Modal';
import { useDeletePayment } from './useDeletePayment';
import ConfirmDelete from '../../ui/ConfirmDelete';
import CreatePaymentForm from './CreatePaymentForm';

const Amount = styled.div`
	font-family: 'Sono';
	font-weight: 500;
`;

function PaymentRow({ payment }) {
	const {
		id: paymentId,
		created_at,
		employee: { full_name: employeeName },
		amount,
		date,
	} = payment;

	const { isDeleting, deletePayment } = useDeletePayment();

	return (
		<Table.Row>
			<div>{employeeName}</div>

			<Amount>{formatCurrency(amount)}</Amount>

			<div>
				<span>{formatDate(new Date(date))}</span>
			</div>

			<Modal>
				<Menus.Menu>
					<Menus.Toggle id={paymentId} />

					<Menus.List id={paymentId}>
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
						<CreatePaymentForm paymentToUpdate={payment} />
					</Modal.Window>

					<Modal.Window name='delete'>
						<ConfirmDelete
							resourceName='Payment'
							onConfirm={() => deletePayment(paymentId)}
							disabled={isDeleting}
						/>
					</Modal.Window>
				</Menus.Menu>
			</Modal>
		</Table.Row>
	);
}

export default PaymentRow;
