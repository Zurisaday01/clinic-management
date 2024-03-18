import supabase from './supabase';

export async function getCategories() {
	let { data, error } = await supabase.from('expenses_categories').select('*');


	if (error) {
		console.error(error);
		throw new Error('Categories could not be loaded');
	}

	return data;
}

export async function createOrUpdateCategory(newCategory, id) {

	let query = supabase.from('expenses_categories');

	// CREATE
	if (!id) query = query.insert([{...newCategory}]);

	// EDIT
	if (id) query = query.update(newCategory).eq('id', id);

	const { data, error } = await query.select().single();

	if (error) {
		console.error(error);
		throw new Error('Category could not be created');
	}

	return data;
}

export async function deleteCategory(id) {
	const { data, error } = await supabase.from('expenses_categories').delete().eq('id', id);

	if (error) {
		console.error(error);
		throw new Error('Category could not be deleted');
	}

	return data;
}
