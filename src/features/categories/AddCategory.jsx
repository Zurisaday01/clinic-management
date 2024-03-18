import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCategoryForm from './CreateCategoryForm';

function AddCategory() {
	return (
		<div>
			<Modal>
				<Modal.Open opens='category-form'>
					<Button>Add new Category</Button>
				</Modal.Open>
				<Modal.Window name='category-form'>
					<CreateCategoryForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}

export default AddCategory;
//
