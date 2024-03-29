import supabase, { supabaseUrl } from './supabase';

export async function signup({ fullName, email, password }) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				fullName,
				avatar: '',
			},
		},
	});
	// options: add optional data

	if (error) throw new Error(error.message);

	return data;
}

export async function login({ email, password }) {
	let { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) throw new Error(error.message);

	return data;
}

export async function getCurrentUser() {
	// NOTE: to know if there is user log in
	const { data: session } = await supabase.auth.getSession();
	if (!session.session) return null;

	// get the user from database validating user's access JWT
	const { data, error } = await supabase.auth.getUser();

	if (error) throw new Error(error.message);

	return data?.user;
}

export async function logout() {
	const { error } = await supabase.auth.signOut();
	if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ fullName, password }) {

	let updateData;
	if (password) updateData = { password };
	// update the user's metadata
	if (fullName) updateData = { data: { fullName } };

	const { data, error } = await supabase.auth.updateUser(updateData);

	if (error) throw new Error(error.message);
	
	return data;
}
