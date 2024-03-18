import supabase from './supabase';

export async function getDoctors() {
	let { data, error } = await supabase.from('doctors').select('*, specialty ( id, name )');


	if (error) {
		console.error(error);
		throw new Error('Doctors could not be loaded');
	}

	return data;
}

export async function createOrUpdateDoctor(newDoctor, id) {

	let query = supabase.from('doctors');

	// CREATE
	if (!id) query = query.insert([{...newDoctor}]);

	// EDIT
	if (id) query = query.update(newDoctor).eq('id', id);

	const { data, error } = await query.select().single();

	if (error) {
		console.error(error);
		throw new Error('Doctor could not be created');
	}

	return data;
}

export async function deleteDoctor(id) {
	const { data, error } = await supabase.from('doctors').delete().eq('id', id);

	if (error) {
		console.error(error);
		throw new Error('Doctor could not be deleted');
	}

	return data;
}
