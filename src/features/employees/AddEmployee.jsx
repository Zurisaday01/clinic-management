import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateEmployeeForm from './CreateEmployeeForm';

function AddCabin() {
	return (
		<div>
			<Modal>
				<Modal.Open opens='employee-form'>
					<Button>Add new Employee</Button>
				</Modal.Open>
				<Modal.Window name='employee-form'>
					<CreateEmployeeForm  />
				</Modal.Window>
			</Modal>
		</div>
	);
}

export default AddCabin;
//
