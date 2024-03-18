import SortBy from '../../ui/SortBy';
import Filter from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';


function AppoitmentsTableOperations({ specialties }) {
	const optionsFilter = specialties.map(specialty => ({
		value: specialty.name.toLowerCase().split(' ').join('-'),
		label: specialty.name,
	}));

	return (
		<TableOperations>
			<Filter
				filterField='specialty'
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

export default AppoitmentsTableOperations;
