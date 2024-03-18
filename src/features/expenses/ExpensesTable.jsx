import ExpenseRow from './ExpenseRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';
import { useExpenses } from './useExpenses';
import Spinner from '../../ui/Spinner';
import Pagination from '../../ui/Pagination';
import { useSearchParams } from 'react-router-dom';
import { sortDateAndAmount } from '../../utils/helpers';

function ExpensesTable({ categories }) {
	const { isLoading, expenses, count } = useExpenses();
	const [searchParams] = useSearchParams();

	if (isLoading) return <Spinner />;
	if (!expenses?.length) return <Empty resource='expenses' />;

	const filterValue = searchParams.get('category') || 'all';

	const categoriesName = categories.map(category => ({
		value: category.name.toLowerCase().split(' ').join('-'),
		label: category.name,
	}));

	let filteredExpenses;
	if (filterValue === 'all') filteredExpenses = expenses;

	categoriesName.forEach(name => {
		if (filterValue === name.value.trim())
			filteredExpenses = expenses.filter(
				expense => expense.category.name === name.label
			);
	});

	const sortedExpenses = sortDateAndAmount(filteredExpenses, searchParams);

	return (
		<Menus>
			<Table columns='0.6fr 2fr 2.4fr 1.4fr 1fr 1fr 3.2rem'>
				<Table.Header>
					<div>ID</div>
					<div>Name</div>
					<div>Category</div>
					<div>Description</div>
					<div>Amount</div>
					<div>Date</div>
					<div></div>
				</Table.Header>

				<Table.Body
					data={sortedExpenses}
					render={expense => <ExpenseRow key={expense.id} expense={expense} />}
				/>
			</Table>
			<Table.Footer>
				<Pagination count={count} />
			</Table.Footer>
		</Menus>
	);
}

export default ExpensesTable;
