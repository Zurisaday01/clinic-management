import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreatePaymentForm from './CreatePaymentForm';

function AddPayment() {
	return (
		<div>
			<Modal>
				<Modal.Open opens='payment-form'>
					<Button>Pay my Employee</Button>
				</Modal.Open>
				<Modal.Window name='payment-form'>
					<CreatePaymentForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}

export default AddPayment;
//
