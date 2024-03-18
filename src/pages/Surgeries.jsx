import Heading from '../ui/Heading';
import Row from '../ui/Row';
import SurgeriesTable from '../features/surgeries/SurgeriesTable';
import AddSurgery from '../features/surgeries/AddSurgery';
import SurgeriesTableOperations from '../features/surgeries/SurgeriesTableOperations';

const Payments = () => {
	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>All Surgeries</Heading>
				<SurgeriesTableOperations />
			</Row>
			<Row>
				<AddSurgery />
				<SurgeriesTable />
			</Row>
		</>
	);
};
export default Payments;
