import Heading from '../ui/Heading';
import Row from '../ui/Row';
import DoctorTable from '../features/doctors/DoctorTable';
import AddDoctor from '../features/doctors/AddDoctor';
import DoctorTableOperations from '../features/doctors/DoctorTableOperations';
import { useSpecialties } from '../features/specialties/useSpecialties';
import Spinner from '../ui/Spinner';

const Doctors = () => {
	const { isLoading, specialties } = useSpecialties();

	if (isLoading) return <Spinner />;
	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>All Doctors</Heading>
				<DoctorTableOperations specialties={specialties}/>
			</Row>
			<Row>
				<AddDoctor />
				<DoctorTable specialties={specialties} />
			</Row>
		</>
	);
};
export default Doctors;
