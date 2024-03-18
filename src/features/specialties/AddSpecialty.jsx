import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateSpecialtyForm from './CreateSpecialtyForm';

function AddSpecialty() {
	return (
		<div>
			<Modal>
				<Modal.Open opens='specialty-form'>
					<Button>Add new Specialty</Button>
				</Modal.Open>
				<Modal.Window name='specialty-form'>
					<CreateSpecialtyForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}

export default AddSpecialty;
//
