import Heading from '../ui/Heading';
import Row from '../ui/Row';
import ExpensesTable from '../features/expenses/ExpensesTable';
import AddExpense from '../features/expenses/AddExpense';
import ExpensesTableOperations from '../features/expenses/ExpensesTableOperations';
import { useCategories } from '../features/categories/useCategories';
import Spinner from '../ui/Spinner';

const Expenses = () => {
	const { isLoading, categories } = useCategories();

	if (isLoading) return <Spinner />;

	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>All Expenses</Heading>
				<ExpensesTableOperations categories={categories} />
			</Row>
			<Row>
				<AddExpense />
				<ExpensesTable categories={categories}/>
			</Row>
		</>
	);
};
export default Expenses;
