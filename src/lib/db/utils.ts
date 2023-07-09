import { drizzle, type BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { users } from '../../schema';

export function createUser(username: string, password: string) {
	const sqlite = new Database('sqlite.db');
	const db: BetterSQLite3Database = drizzle(sqlite);

	try {
		const id = db
			.insert(users)
			.values({ username: username, password: password })
			.onConflictDoNothing({ target: [users.username, users.id] })
			.returning({ insertedId: users.id });

		if (id) {
			return {
				error: false,
				message: 'User created successfully.',
				id: id
			};
		} else {
			return {
				error: true,
				message: 'User already exists.'
			};
		}
	} catch (error) {
		console.error(error);
		return {
			error: true,
			message: 'An error occurred while creating the user.'
		};
	}
}
