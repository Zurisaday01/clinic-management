import styled from 'styled-components';

import Spinner from '../../ui/Spinner';
import DoctorRow from './DoctorRow';
import { useDoctors } from './useDoctors';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty';

function DoctorTable({ specialties }) {
	const { isLoading, doctors } = useDoctors();
	const [searchParams] = useSearchParams();

	if (isLoading) return <Spinner />;

	if (!doctors?.length) return <Empty resource='doctors' />;

	const filterValue = searchParams.get('specialty') || 'all';

	const specialtiesName = specialties.map(category => ({
		value: category.name.toLowerCase().split(' ').join('-'),
		label: category.name,
	}));

	let filteredDoctors;
	if (filterValue === 'all') filteredDoctors = doctors;

	specialtiesName.forEach(name => {
		if (filterValue === name.value.trim())
		filteredDoctors = doctors.filter(
				doctor => doctor.specialty.name === name.label
			);
	});

	// SORT
	const sortBy = searchParams.get('sortBy') || 'full_name-asc';
	const [field, direction] = sortBy.split('-');
	const modifier = direction === 'asc' ? 1 : -1;

	const sortedDoctors = filteredDoctors.sort(
		(a, b) => a[field].localeCompare(b[field]) * modifier
	);

	return (
		<Menus>
			<Table columns='0.6fr 3fr 2.2fr 1fr 1fr'>
				<Table.Header>
					<div>ID</div>
					<div>Full name</div>
					<div>Phone</div>
					<div>Specialty</div>
					<div></div>
				</Table.Header>
				{/* Render props pattern */}
				<Table.Body
					data={sortedDoctors}
					render={doctor => <DoctorRow key={doctor.id} doctor={doctor} />}
				/>
			</Table>
		</Menus>
	);
}

export default DoctorTable;
