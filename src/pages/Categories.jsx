import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CategoriesTable from '../features/categories/CategoriesTable';
import AddCategory from '../features/categories/AddCategory';
import CategoriesTableOperations from '../features/categories/CategoriesTableOperations';

const Categories = () => {
	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>All Categories</Heading>
				<CategoriesTableOperations />
			</Row>
			<Row>
				<AddCategory />
				<CategoriesTable />
			</Row>
		</>
	);
};
export default Categories;
