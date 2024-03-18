import { getToday } from '../utils/helpers';
import supabase from './supabase';
import { PAGE_SIZE } from '../utils/constants';

export async function getPayments({ page }) {
	let query = supabase
		.from('payments')
		.select(
			'id, employee ( id, full_name ), amount, date',
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
		throw new Error('Payments could not be loaded');
	}

	return { data, count };
}

export async function getPayment(id) {
	const { data, error } = await supabase
		.from('payments')
		.select('id, employee ( id, full_name ), amount, date')
		.eq('id', id)
		.single();

	if (error) {
		console.error(error);
		throw new Error('Payment not found');
	}

	return data;
}

// Returns all EXPENSES that are were created after the given date. Useful to get expenses created in the last 30 days, for example.
export async function getPaymentAfterDate(date) {
	const { data, error } = await supabase
		.from('payments')
		.select('created_at, amount')
		.gte('created_at', date)
		.lte('created_at', getToday({ end: true }));

	if (error) {
		console.error(error);
		throw new Error('Payments could not get loaded');
	}

	return data;
}


// Activity means that there are expenses today
export async function getPaymentTodayActivity() {
	const { data, error } = await supabase
		.from('payments')
		.select('*, expenses_categories(name)')
		.or(
			`and(date.eq.${getToday()})`
		)
		.order('created_at');

	if (error) {
		console.error(error);
		throw new Error('Payments could not get loaded');
	}
	return data;
}

export async function createOrUpdatePayment(newPayment, id) {

	let query = supabase.from('payments');

	// CREATE
	if (!id) query = query.insert([{...newPayment}]);

	// EDIT
	if (id) query = query.update(newPayment).eq('id', id);

	const { data, error } = await query.select().single();

	if (error) {
		console.error(error);
		throw new Error('Payment could not be created');
	}

	return data;
}

export async function deletePayment(id) {
	// REMEMBER RLS POLICIES
	const { data, error } = await supabase.from('payments').delete().eq('id', id);

	if (error) {
		console.error(error);
		throw new Error('Payment could not be deleted');
	}
	return data;
}
