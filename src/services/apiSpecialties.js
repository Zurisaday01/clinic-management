import supabase from './supabase';

export async function getSpecialties() {
	let { data, error } = await supabase.from('specialties').select('*');

	if (error) {
		console.error(error);
		throw new Error('Specialties could not be loaded');
	}

	return data;
}

export async function createOrUpdateSpecialty(newSpecialty, id) {

	let query = supabase.from('specialties');

	// CREATE
	if (!id) query = query.insert([{...newSpecialty}]);

	// EDIT
	if (id) query = query.update(newSpecialty).eq('id', id);

	const { data, error } = await query.select().single();

	if (error) {
		console.error(error);
		throw new Error('Specialty could not be created');
	}

	return data;
}

export async function deleteSpecialty(id) {
	const { data, error } = await supabase.from('specialties').delete().eq('id', id);

	if (error) {
		console.error(error);
		throw new Error('Specialty could not be deleted');
	}

	return data;
}
