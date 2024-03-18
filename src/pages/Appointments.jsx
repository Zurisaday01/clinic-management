import Heading from '../ui/Heading';
import Row from '../ui/Row';
import AppointmentsTable from '../features/appointments/AppointmentsTable';
import AddAppointment from '../features/appointments/AddAppointment';
import AppointmentsTableOperations from '../features/appointments/AppointmentsTableOperations';
import { useSpecialties } from '../features/specialties/useSpecialties';
import Spinner from '../ui/Spinner';

const Appointments = () => {
	const { isLoading, specialties } = useSpecialties();

	if (isLoading) return <Spinner />;

	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>All Appointments</Heading>
				<AppointmentsTableOperations specialties={specialties} />
			</Row>
			<Row>
				<AddAppointment />
				<AppointmentsTable specialties={specialties} />
			</Row>
		</>
	);
};
export default Appointments;
