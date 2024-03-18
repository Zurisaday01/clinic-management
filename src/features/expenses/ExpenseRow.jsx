/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { format, isToday, parseISO } from 'date-fns';

import Tag from '../../ui/Tag';
import Table from '../../ui/Table';

import { formatCurrency, formatDate } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';
import Menus from '../../ui/Menus';
import { MdEdit, MdDelete } from 'react-icons/md';

import Modal from '../../ui/Modal';
import { useDeleteExpense } from './useDeleteExpense';
import ConfirmDelete from '../../ui/ConfirmDelete';
import CreateExpenseForm from './CreateExpenseForm';

const ID = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: 'Sono';
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

const Amount = styled.div`
	font-family: 'Sono';
	font-weight: 500;
`;

function ExpenseRow({ expense }) {
	const {
		id: expenseId,
		created_at,
		category: { name: categoryName },
		name,
		amount,
		description,
		date,
	} = expense;

	const { isDeleting, deleteExpense } = useDeleteExpense();

	return (
		<Table.Row>
			<ID>{expenseId}</ID>

			<div>{name}</div>

			<div>{categoryName}</div>

			<div>{description ? description : '-'}</div>

			<Amount>{formatCurrency(amount)}</Amount>

			<div>
				<span>{formatDate(new Date(date))}</span>
			</div>

			<Modal>
				<Menus.Menu>
					<Menus.Toggle id={expenseId} />

					<Menus.List id={expenseId}>
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
						<CreateExpenseForm expenseToUpdate={expense} />
					</Modal.Window>

					<Modal.Window name='delete'>
						<ConfirmDelete
							resourceName='expense'
							onConfirm={() => deleteExpense(expenseId)}
							disabled={isDeleting}
						/>
					</Modal.Window>
				</Menus.Menu>
			</Modal>
		</Table.Row>
	);
}

export default ExpenseRow;
