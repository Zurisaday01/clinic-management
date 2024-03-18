/* eslint-disable react/prop-types */
import styled from 'styled-components';
import Modal from '../../ui/Modal';
import CreateCategoryForm from './CreateCategoryForm';
import { useDeleteCategory } from './useDeleteCategory';
import { MdEdit, MdDelete } from 'react-icons/md';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

const Id = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: 'Sono';
`;

function CategoryRow({ category }) {
	const { id: categoryId, name } = category || {};
	const { isDeleting, deleteCategory } = useDeleteCategory();

	if (category)
		return (
			<>
				<Table.Row>
					<Id>{categoryId}</Id>
					<div>{name}</div>
					<div>
						{/* Could be either the Modal first or Menus.Menu */}
						<Modal>
							<Menus.Menu>
								<Menus.Toggle id={categoryId} />

								<Menus.List id={categoryId}>
									{/* EDIT */}
									<Modal.Open opens='update'>
										<Menus.Button icon={<MdEdit />}>Edit</Menus.Button>
									</Modal.Open>
									{/* DELETE */}
									<Modal.Open opens='delete'>
										<Menus.Button icon={<MdDelete />}>Delete</Menus.Button>
									</Modal.Open>
								</Menus.List>

								{/* WINDOWS ARE OUTSIDE OF THE MENU LIST */}
								<Modal.Window name='update'>
									<CreateCategoryForm categoryToUpdate={category} />
								</Modal.Window>

								<Modal.Window name='delete'>
									<ConfirmDelete
										resourceName='category'
										onConfirm={() => deleteCategory(categoryId)}
										disabled={isDeleting}
									/>
								</Modal.Window>
							</Menus.Menu>
						</Modal>
					</div>
				</Table.Row>
			</>
		);
}

export default CategoryRow;
