import { getToday } from '../utils/helpers';
import supabase from './supabase';
import { PAGE_SIZE } from '../utils/constants';

export async function getExpenses({ filter, sortBy, page }) {
	let query = supabase
		.from('expenses')
		.select(
			'id, name, category ( id, name ), amount, description, date',
			{ count: 'exact' }
		);

	// SORT
	if (sortBy)
		query = query.order(sortBy.field, {
			ascending: sortBy.direction === 'asc',
		});

	if (page) {
		const from = (page - 1) * PAGE_SIZE;
		const to = from + PAGE_SIZE - 1;	
		query = query.range(from, to);
	}

	const { data, error, count } = await query;

	if (error) {
		console.error(error);
		throw new Error('Expenses could not be loaded');
	}

	return { data, count };
}

export async function getExpense(id) {
	const { data, error } = await supabase
		.from('expenses')
		.select('*, expenses_categories(*)')
		.eq('id', id)
		.single();

	if (error) {
		console.error(error);
		throw new Error('Expense not found');
	}

	return data;
}


export async function createOrUpdateExpense(newExpense, id) {

	let query = supabase.from('expenses');

	// CREATE
	if (!id) query = query.insert([{...newExpense}]);

	// EDIT
	if (id) query = query.update(newExpense).eq('id', id);

	const { data, error } = await query.select().single();

	if (error) {
		console.error(error);
		throw new Error('Expense could not be created');
	}

	return data;
}

export async function deleteExpense(id) {
	// REMEMBER RLS POLICIES
	const { data, error } = await supabase.from('expenses').delete().eq('id', id);

	if (error) {
		console.error(error);
		throw new Error('Expense could not be deleted');
	}
	return data;
}


export async function getExpensesAfterDate(date) {
	const { data, error } = await supabase
		.from('expenses')
		.select('created_at, category (id, name), amount, date')
		.gte('date', date)
		.lte('date', getToday({ end: true }));

	if (error) {
		console.error(error);
		throw new Error('Expenses could not get loaded');
	}

	return data;
}