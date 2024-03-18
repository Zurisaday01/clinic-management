import styled from 'styled-components';
import { useCategories } from './useCategories';

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

const SelectCategory = ({ category, setCategory, isEditSession }) => {
	const { categories, isLoading } = useCategories();

	const handleChange = categoryChange => {
		setCategory(categoryChange);
	};

	const optionsFilter = categories.map(category => ({
		value: category.id,
		label: category.name,
	}));

	return (
		<StyledSelect value={category} onChange={e => handleChange(e.target.value)}>
			{optionsFilter.map(option => (
				<option value={option.value} key={option.value}>
					{option.label}
				</option>
			))}
		</StyledSelect>
	);
};
export default SelectCategory;
