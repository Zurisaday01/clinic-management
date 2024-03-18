import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';

function DoctorTableOperations({ specialties }) {
	const optionsFilter = specialties.map(specialty => ({
		value: specialty.name.toLowerCase().split(' ').join('-'),
		label: specialty.name,
	}));
	return (
		<>
			{/* FILTER */}
			<Filter
				filterField='specialty'
				options={[{ value: 'all', label: 'All' }, ...optionsFilter]}
			/>
			{/* SORT BY */}
			<SortBy
				options={[
					{ value: 'full_name-asc', label: 'Sort by full name (A-Z)' },
					{ value: 'full_name-desc', label: 'Sort by full name (Z-A)' },
				]}
			/>
		</>
	);
}

export default DoctorTableOperations;
