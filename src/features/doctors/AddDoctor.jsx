import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateDoctorForm from './CreateDoctorForm';

function AddCabin() {
	return (
		<div>
			<Modal>
				<Modal.Open opens='doctor-form'>
					<Button>Add new Doctor</Button>
				</Modal.Open>
				<Modal.Window name='doctor-form'>
					<CreateDoctorForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}

export default AddCabin;
//
