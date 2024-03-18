import Spinner from '../../ui/Spinner';
import CategoryRow from './CategoryRow';
import { useCategories } from './useCategories';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty';

function CategoriesTable() {
	const { isLoading, categories } = useCategories();
	const [searchParams] = useSearchParams();

	if (isLoading) return <Spinner />;

	if (!categories?.length) return <Empty resource='categories' />;

	const sortBy = searchParams.get('sortBy') || 'name-asc';
	const [field, direction] = sortBy.split('-');
	const modifier = direction === 'asc' ? 1 : -1;

	const sortedCategories = categories.sort(
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
					data={sortedCategories}
					render={category => (
						<CategoryRow key={category.id} category={category} />
					)}
				/>
			</Table>
		</Menus>
	);
}

export default CategoriesTable;
