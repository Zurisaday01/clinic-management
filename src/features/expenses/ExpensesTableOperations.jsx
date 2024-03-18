import SortBy from '../../ui/SortBy';
import Filter from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';

function ExpensesTableOperations({ categories }) {
	const optionsFilter = categories.map(category => ({
		value: category.name.toLowerCase().split(' ').join('-'),
		label: category.name,
	}));

	return (
		<TableOperations>
			<Filter
				filterField='category'
				options={[{ value: 'all', label: 'All' }, ...optionsFilter]}
			/>

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

export default ExpensesTableOperations;
