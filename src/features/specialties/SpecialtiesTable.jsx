import Spinner from '../../ui/Spinner';
import SpecialtyRow from './SpecialtyRow';
import { useSpecialties } from './useSpecialties';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty';

function SpecialtiesTable() {
	const { isLoading, specialties } = useSpecialties();
	const [searchParams] = useSearchParams();

	if (isLoading) return <Spinner />;

	if (!specialties?.length) return <Empty resource='specialties' />;

	const sortBy = searchParams.get('sortBy') || 'name-asc';
	const [field, direction] = sortBy.split('-');
	const modifier = direction === 'asc' ? 1 : -1;

	const sortedSpecialties = specialties.sort(
		(a, b) => a[field].localeCompare(b[field]) * modifier
	);

	return (
		<Menus>
			<Table columns='5rem 1fr 5rem'>
				<Table.Header>
					<div>ID</div>
					<div>Name</div>
					<div></div>
				</Table.Header>
				{/* Render props pattern */}
				<Table.Body
					data={sortedSpecialties}
					render={specialty => (
						<SpecialtyRow key={specialty.id} specialty={specialty} />
					)}
				/>
			</Table>
		</Menus>
	);
}

export default SpecialtiesTable;
