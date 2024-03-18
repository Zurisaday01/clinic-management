import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateSurgeriesForm from './CreateSurgeriesForm';

function AddSurgery() {
	return (
		<div>
			<Modal>
				<Modal.Open opens='surgeries-form'>
					<Button>Add new Surgery</Button>
				</Modal.Open>
				<Modal.Window name='surgeries-form'>
					<CreateSurgeriesForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}

export default AddSurgery;
//
