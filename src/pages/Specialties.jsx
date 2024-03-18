import Heading from '../ui/Heading';
import Row from '../ui/Row';
import SpecialtiesTable from '../features/specialties/SpecialtiesTable';
import AddSpecialty from '../features/specialties/AddSpecialty';
import SpecialtiesTableOperations from '../features/specialties/SpecialtiesTableOperations';

const Specialties = () => {
	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>All Specialties</Heading>
				<SpecialtiesTableOperations />
			</Row>
			<Row>
				<AddSpecialty />
				<SpecialtiesTable />
			</Row>
		</>
	);
};
export default Specialties;
