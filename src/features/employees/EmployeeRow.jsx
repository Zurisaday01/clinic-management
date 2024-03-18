/* eslint-disable react/prop-types */
import styled from 'styled-components';
import Modal from '../../ui/Modal';
import CreateEmployeeForm from './CreateEmployeeForm';
import { formatCurrency } from '../../utils/helpers';
import { useDeleteEmployee } from './useDeleteEmployee';
import { MdEdit, MdDelete } from 'react-icons/md';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Tag from '../../ui/Tag';

const Id = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: 'Sono';
`;

const Salary = styled.div`
	font-family: 'Sono';
	font-weight: 600;
`;

function EmployeeRow({ employee }) {
	const {
		id: employeeId,
		full_name,
		job_title,
		salary,
		status,
	} = employee || {};

	const { isDeleting, deleteEmployee } = useDeleteEmployee();

	const statusToTagName = {
		active: 'blue',
		inactive: 'silver',
	};

	if (employee)
		return (
			<>
				<Table.Row>
					<Id>{employeeId}</Id>
					<div>{full_name}</div>
					<div>{job_title}</div>
					<Salary>{formatCurrency(salary)}</Salary>
					<Tag type={statusToTagName[status]}>{status}</Tag>
					<div>
						{/* Could be either the Modal first or Menus.Menu */}
						<Modal>
							<Menus.Menu>
								<Menus.Toggle id={employeeId} />

								<Menus.List id={employeeId}>
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
									<CreateEmployeeForm employeeToUpdate={employee} />
								</Modal.Window>

								<Modal.Window name='delete'>
									<ConfirmDelete
										resourceName='employee'
										onConfirm={() => deleteEmployee(employeeId)}
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

export default EmployeeRow;
