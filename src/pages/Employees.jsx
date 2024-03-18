import Heading from '../ui/Heading';
import Row from '../ui/Row';
import EmployeeTable from '../features/employees/EmployeeTable';
import AddEmployee from '../features/employees/AddEmployee';
import EmployeeTableOperations from '../features/employees/EmployeeTableOperations';

const Employees = () => {
	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>All Employees</Heading>
				<EmployeeTableOperations />
			</Row>
			<Row>
				<AddEmployee />
				<EmployeeTable />
			</Row>
		</>
	);
};
export default Employees;
