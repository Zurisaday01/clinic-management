import AppointmentRow from './AppointmentRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';
import { useAppointments } from './useAppoitments';
import Spinner from '../../ui/Spinner';
import Pagination from '../../ui/Pagination';
import { useSearchParams } from 'react-router-dom';
import { sortDateAndAmount } from '../../utils/helpers';

function AppointmentsTable({ specialties }) {
	const { isLoading, appointments, count } = useAppointments();
	const [searchParams] = useSearchParams();

	if (isLoading) return <Spinner />;
	if (!appointments?.length) return <Empty resource='appointments' />;

	const filterValue = searchParams.get('specialty') || 'all';

	const specialtiesName = specialties.map(category => ({
		value: category.name.toLowerCase().split(' ').join('-'),
		label: category.name,
	}));

	let filteredAppointments;
	if (filterValue === 'all') filteredAppointments = appointments;

	specialtiesName.forEach(name => {
		if (filterValue === name.value.trim())
			filteredAppointments = appointments.filter(
				appointment => appointment.specialty.name === name.label
			);
	});

	const sortedAppointments = sortDateAndAmount(filteredAppointments, searchParams)

	return (
		<Menus>
			<Table columns='0.6fr 2fr 2fr 2fr 2fr 2fr 2fr 3.2rem'>
				<Table.Header>
					<div>ID</div>
					<div>Patient's name</div>
					<div>Patient's age</div>
					<div>Doctor</div>
					<div>Specialty</div>
					<div>Amount</div>
					<div>Date</div>
					<div></div>
				</Table.Header>

				<Table.Body
					data={sortedAppointments}
					render={appointment => (
						<AppointmentRow key={appointment.id} appointment={appointment} />
					)}
				/>
			</Table>
			<Table.Footer>
				<Pagination count={count} />
			</Table.Footer>
		</Menus>
	);
}

export default AppointmentsTable;
