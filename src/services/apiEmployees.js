import supabase from './supabase';

export async function getEmployees() {
	let { data, error } = await supabase.from('employees').select('*');

	if (error) {
		console.error(error);
		throw new Error('Employees could not be loaded');
	}

	return data;
}

export async function createOrUpdateEmployee(newEmployee, id) {

	let query = supabase.from('employees');

	// CREATE
	// NOTE: there is no employee to edit, means you are creating
	if (!id) query = query.insert([{...newEmployee}]);

	// EDIT
	if (id) query = query.update(newEmployee).eq('id', id);

	const { data, error } = await query.select().single();

	if (error) {
		console.error(error);
		throw new Error('Employee could not be created');
	}

	return data;
}

export async function deleteEmployee(id) {
	const { data, error } = await supabase.from('employees').delete().eq('id', id);

	if (error) {
		console.error(error);
		throw new Error('Employee could not be deleted');
	}

	return data;
}
