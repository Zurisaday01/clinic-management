import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
function EmployeeTableOperations() {
	return (
		<>
			{/* FILTER */}
			<Filter
				filterField='status'
				options={[
					{ value: 'all', label: 'All' },
					{ value: 'active', label: 'Active' },
					{ value: 'inactive', label: 'Inactive' },
				]}
			/>
			{/* SORT BY */}
			<SortBy
				options={[
					{ value: 'full_name-asc', label: 'Sort by full name (A-Z)' },
					{ value: 'full_name-desc', label: 'Sort by full name (Z-A)' },
					{ value: 'salary-asc', label: 'Sort by salary (low first)' },
					{ value: 'salary-desc', label: 'Sort by salary (high first)' },
				]}
			/>
		</>
	);
}

export default EmployeeTableOperations;

/*
NOTE

to filter cabins we need to modify the url to change the query string according to the value of the filter option we are selecting

I am filtering the table according to the discound

QueryString

?discound=all

Options
!all
!no-discount
!with-discount

*/
