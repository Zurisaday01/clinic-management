import PaymentRow from './PaymentRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';
import { usePayments } from './usePayments';
import Spinner from '../../ui/Spinner';
import Pagination from '../../ui/Pagination';
import { useSearchParams } from 'react-router-dom';

function PaymentTable() {
	const { isLoading, payments, count } = usePayments();
	const [searchParams] = useSearchParams();

	if (isLoading) return <Spinner />;
	if (!payments?.length) return <Empty resource='payments' />;

	const sortBy = searchParams.get('sortBy') || 'full_name-asc';
	const [field, direction] = sortBy.split('-');
	const modifier = direction === 'asc' ? 1 : -1;

	let sortedPayments;
	if (sortBy.includes('name')) {
		sortedPayments = payments.sort(
			(a, b) => a.employee[field].localeCompare(b.employee[field]) * modifier
		);
	} else if (sortBy.includes('date')) {
		sortedPayments = payments.sort(
			(a, b) => new Date(a[field]) - new Date(b[field]) * modifier
		);
	} else {
		sortedPayments = payments.sort((a, b) => (a[field] - b[field]) * modifier);
	}

	return (
		<Menus>
			<Table columns='2fr 2.4fr 1.4fr 3.2rem'>
				<Table.Header>
					<div>Full Name</div>
					<div>Amount</div>
					<div>Date</div>
					<div></div>
				</Table.Header>

				<Table.Body
					data={payments}
					render={payment => <PaymentRow key={payment.id} payment={payment} />}
				/>
			</Table>
			<Table.Footer>
				<Pagination count={count} />
			</Table.Footer>
		</Menus>
	);
}

export default PaymentTable;
