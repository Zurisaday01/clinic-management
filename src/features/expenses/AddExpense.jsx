import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateExpenseForm from './CreateExpenseForm';

function AddExpense() {
	return (
		<div>
			<Modal>
				<Modal.Open opens='expense-form'>
					<Button>Add new Expense</Button>
				</Modal.Open>
				<Modal.Window name='expense-form'>
					<CreateExpenseForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}

export default AddExpense;
//
