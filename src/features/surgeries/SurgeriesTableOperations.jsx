import SortBy from '../../ui/SortBy';
import TableOperations from '../../ui/TableOperations';

function SurgeriesTableOperations() {
	return (
		<TableOperations>
			<SortBy
				options={[
					{ value: 'date-desc', label: 'Sort by date (recent first)' },
					{ value: 'date-asc', label: 'Sort by date (oldest first)' },
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

export default SurgeriesTableOperations;
