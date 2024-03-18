import styled from 'styled-components';

import Spinner from '../../ui/Spinner';
import EmployeeRow from './EmployeeRow';
import { useEmployees } from './useEmployees';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty';

function EmployeeTable() {
	const { isLoading, employees } = useEmployees();
	const [searchParams] = useSearchParams();

	if (isLoading) return <Spinner />;

	if (!employees?.length) return <Empty resource='employees' />;

	const filterValue = searchParams.get('status') || 'all';

	let filteredEmployees;
	if (filterValue === 'all') filteredEmployees = employees;
	if (filterValue === 'active')
		filteredEmployees = employees.filter(
			employees => employees.status === 'active'
		);
	if (filterValue === 'inactive')
		filteredEmployees = employees.filter(
			employees => employees.status === 'inactive'
		);

	// SORT
	const sortBy = searchParams.get('sortBy') || 'full_name-asc';
	const [field, direction] = sortBy.split('-');
	const modifier = direction === 'asc' ? 1 : -1;

	let sortedEmployees;
	if (field === 'full_name') {
		sortedEmployees = filteredEmployees.sort(
			(a, b) => a[field].localeCompare(b[field]) * modifier
		);
	} else {
		sortedEmployees = filteredEmployees.sort(
			(a, b) => (a[field] - b[field]) * modifier
		);
	}

	return (
		<Menus>
			<Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
				<Table.Header>
					<div>ID</div>
					<div>Full name</div>
					<div>Job Title</div>
					<div>Salary</div>
					<div>Status</div>
					<div></div>
				</Table.Header>
				{/* Render props pattern */}
				<Table.Body
					data={sortedEmployees}
					render={employee => (
						<EmployeeRow key={employee.id} employee={employee} />
					)}
				/>
			</Table>
		</Menus>
	);
}

export default EmployeeTable;
