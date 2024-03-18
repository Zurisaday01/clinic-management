import { Label } from './FormRow';
import { DatePicker } from 'antd';
import styled from 'styled-components';

const StyledRowPicker = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: 24rem 1fr 1.2fr;
	gap: 2.4rem;
`;

const RowPicker = ({ label, ...others }) => {
	return (
		<StyledRowPicker>
				<Label htmlFor='date'>{label}</Label>
				<DatePicker {...others} />
		</StyledRowPicker>
	);
};
export default RowPicker;
