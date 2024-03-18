import { getToday } from '../utils/helpers';
import supabase from './supabase';
import { PAGE_SIZE } from '../utils/constants';

export async function getSurgeries({ page }) {
	let query = supabase
		.from('surgeries')
		.select(
			'*',
			{ count: 'exact' }
		);

	if (page) {
		const from = (page - 1) * PAGE_SIZE;
		const to = from + PAGE_SIZE - 1;	
		query = query.range(from, to);
	}

	const { data, error, count } = await query;

	if (error) {
		console.error(error);
		throw new Error('Surgeries could not be loaded');
	}

	return { data, count };
}


export async function createOrUpdateSurgery(newSurgery, id) {

	let query = supabase.from('surgeries');

	console.log(newSurgery)

	// CREATE
	if (!id) query = query.insert([{...newSurgery}]);

	// EDIT
	if (id) query = query.update(newSurgery).eq('id', id);

	const { data, error } = await query.select().single();

	if (error) {
		console.error(error);
		throw new Error('Surgery could not be created');
	}

	return data;
}

export async function deleteSurgery(id) {
	// REMEMBER RLS POLICIES
	const { data, error } = await supabase.from('surgeries').delete().eq('id', id);

	if (error) {
		console.error(error);
		throw new Error('Surgery could not be deleted');
	}
	return data;
}


export async function getSurgeriesAfterDate(date) {
	const { data, error } = await supabase
		.from('surgeries')
		.select('created_at, total_amount, amount, date')
		.gte('date', date)
		.lte('date', getToday({ end: true }));

	if (error) {
		console.error(error);
		throw new Error('Surgeries could not get loaded');
	}

	return data;
}