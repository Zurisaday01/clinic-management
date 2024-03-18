import SortBy from '../../ui/SortBy';
import TableOperations from '../../ui/TableOperations';

function SpecialtyTableOperations() {
	return (
		<TableOperations>
			<SortBy
				options={[
					{ value: 'name-asc', label: 'Sort by name (A-Z)' },
					{ value: 'name-desc', label: 'Sort by name (Z-A)' },
				]}
			/>
		</TableOperations>
	);
}

export default SpecialtyTableOperations;
