import { fail, type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
// import { createUser } from '$lib/db/utils';
import { auth } from '$lib/server/lucia';

export const load = (async ({ locals }) => {
	const { session } = await locals.auth.validateUser();
	if (session) throw redirect(302, '/');
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		if (typeof username !== 'string' || typeof password !== 'string') {
			return fail(400, { username, missing: true });
		}

		if (!username) {
			return fail(400, { username, missing: true });
		}

		try {
			const user = await auth.createUser({
				primaryKey: {
					providerId: 'username',
					providerUserId: username,
					password
				},
				attributes: {
					username
				}
			});
			const session = await auth.createSession(user.userId);
			locals.auth.setSession(session);
		} catch (e) {
			console.log(e);
			// username taken
			return fail(400, { username, error: true, message: 'username has been taken' });
		}

		console.log('User created successfully.');

		return JSON.parse(
			JSON.stringify({
				status: 200,
				body: {
					error: false,
					message: 'Account has been created'
				}
			})
		);
	}
} satisfies Actions;
