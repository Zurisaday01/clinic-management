import Heading from '../ui/Heading';
import Row from '../ui/Row';
import PaymentTable from '../features/payments/PaymentTable';
import AddPayments from '../features/payments/AddPayment';
import PaymentsTableOperations from '../features/payments/PaymentTableOperations';
import { usePayments } from '../features/payments/usePayments';
import Spinner from '../ui/Spinner';

const Payments = () => {
	const { isLoading, payments } = usePayments();

	if (isLoading) return <Spinner />;

	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>All Salary Payments</Heading>
				<PaymentsTableOperations payments={payments} />
			</Row>
			<Row>
				<AddPayments />
				<PaymentTable payments={payments} />
			</Row>
		</>
	);
};
export default Payments;
