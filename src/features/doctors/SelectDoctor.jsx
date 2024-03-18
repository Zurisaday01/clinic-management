import styled from 'styled-components';
import { useDoctors } from './useDoctors';
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

const SelectDoctor = ({ doctor, setDoctor, isEditSession }) => {
	const { doctors, isLoading } = useDoctors();
	if (isLoading) return <SpinnerMini />;

	const handleChange = doctorChange => {
		setDoctor(doctorChange);
	};

	const optionsFilter = doctors.map(doctor => ({
		value: doctor.id,
		label: doctor.full_name,
	}));


	return (
		<StyledSelect value={doctor} onChange={e => handleChange(e.target.value)}>
			{optionsFilter.map(option => (
				<option value={option.value} key={option.value}>
					{option.label}
				</option>
			))}
		</StyledSelect>
	);
};
export default SelectDoctor;
