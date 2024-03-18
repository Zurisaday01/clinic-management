import SurgeryRow from './SurgeryRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';
import { useSurgeries } from './useSurgeries';
import Spinner from '../../ui/Spinner';
import Pagination from '../../ui/Pagination';
import { useSearchParams } from 'react-router-dom';
import { sortDateAndAmount } from '../../utils/helpers';


function SurgeriesTable() {
	const { isLoading, surgeries, count } = useSurgeries();
	const [searchParams] = useSearchParams();

	if (isLoading) return <Spinner />;


	const sortedSurgeries = sortDateAndAmount( surgeries, searchParams)


	return (
		<Menus>
			<Table columns='0.6fr 1fr 1fr 1fr 1fr 3.2rem'>
				<Table.Header>
					<div>ID</div>
					<div>Type</div>
					<div>Total Amount</div>
					<div>Net Amount</div>
					<div>Date</div>
					<div></div>
				</Table.Header>

				<Table.Body
					data={sortedSurgeries}
					render={surgery => <SurgeryRow key={surgery.id} surgery={surgery} />}
				/>
			</Table>
			<Table.Footer>
				<Pagination count={count} />
			</Table.Footer>
		</Menus>
	);
}

export default SurgeriesTable;
