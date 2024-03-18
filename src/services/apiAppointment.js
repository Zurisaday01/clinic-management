import { getToday } from '../utils/helpers';
import supabase from './supabase';
import { PAGE_SIZE } from '../utils/constants';

export async function getAppointments({ page }) {
	let query = supabase
		.from('appointments')
		.select(
			'id, created_at, full_name, doctor ( id, full_name ), specialty ( id, name ), age, amount, time, date',
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
		throw new Error('Appointments could not be loaded');
	}

	return { data, count };
}

export async function getAppointment(id) {
	const { data, error } = await supabase
		.from('appointments')
		.select('id, created_at, full_name, doctor ( id, full_name ), specialty ( id, name ), age, time')
		.eq('id', id)
		.single();

	if (error) {
		console.error(error);
		throw new Error('Appointment not found');
	}

	return data;
}


export async function createOrUpdateAppointment(newAppointment, id) {

	let query = supabase.from('appointments');

	// CREATE
	if (!id) query = query.insert([{...newAppointment}]);

	// EDIT
	if (id) query = query.update(newAppointment).eq('id', id);

	const { data, error } = await query.select().single();

	if (error) {
		console.error(error);
		throw new Error('Appointment could not be created');
	}

	return data;
}

export async function deleteAppointment(id) {
	// REMEMBER RLS POLICIES
	const { data, error } = await supabase.from('appointments').delete().eq('id', id);

	if (error) {
		console.error(error);
		throw new Error('Appointment could not be deleted');
	}
	return data;
}


export async function getAppointmentsAfterDate(date) {
	const { data, error } = await supabase
		.from('appointments')
		.select('created_at, amount, date')
		.gte('date', date)
		.lte('date', getToday({ end: true }));

	if (error) {
		console.error(error);
		throw new Error('Appointments could not get loaded');
	}

	return data;
}