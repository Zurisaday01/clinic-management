import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateExpenseForm from './CreateAppointmentForm';

function AddAppointment() {
	return (
		<div>
			<Modal>
				<Modal.Open opens='appointment-form'>
					<Button>Add new Appointment</Button>
				</Modal.Open>
				<Modal.Window name='appointment-form'>
					<CreateExpenseForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}

export default AddAppointment;
//
