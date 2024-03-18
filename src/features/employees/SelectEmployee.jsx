import styled from 'styled-components';
import { useEmployees } from './useEmployees';
import SpinnerMini from '../../ui/SpinnerMini';

const StyledSelect = styled.select`
	font-size: 1.4rem;
	padding: 0.8rem 1.2rem;
	border: 1px solid
		${props =>
			props.type === 'white'
				? 'var(--color-grey-100)'
				: 'var(--color-grey-300)'};
	border-radius: var(--border-radius-sm);
	background-color: var(--color-grey-0);
	font-weight: 500;
	box-shadow: var(--shadow-sm);
`;

const SelectEmployee = ({ employee, setEmployee, isEditSession }) => {
	const { employees, isLoading } = useEmployees();

	const handleChange = employeeChange => {
		setEmployee(employeeChange);
	};

	const optionsFilter = employees?.map(employee => ({
		value: employee.id,
		label: employee.full_name,
	}));

	if (isLoading) return <SpinnerMini />;

	return (
		<StyledSelect value={employee} onChange={e => handleChange(e.target.value)}>
			{optionsFilter?.map(option => (
				<option value={option.value} key={option.value}>
					{option.label}
				</option>
			))}
		</StyledSelect>
	);
};
export default SelectEmployee;
