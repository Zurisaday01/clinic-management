import SortBy from '../../ui/SortBy';
import TableOperations from '../../ui/TableOperations';

function ExpensesTableOperations() {
	return (
		<TableOperations>
			<SortBy
				options={[
					{ value: 'full_name-asc', label: 'Sort by full name (A-Z)' },
					{ value: 'full_name-desc', label: 'Sort by full name (Z-A)' },
					{ value: 'date-desc', label: 'Sort by date (recent first)' },
					{ value: 'date-asc', label: 'Sort by date (olders first)' },
					{
						value: 'amount-desc',
						label: 'Sort by amount (high first)',
					},
					{ value: 'amount-asc', label: 'Sort by amount (low first)' },
				]}
			/>
		</TableOperations>
	);
}

export default ExpensesTableOperations;
