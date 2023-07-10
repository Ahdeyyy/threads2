import { drizzle, type BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { users } from '../../schema';
import { eq } from 'drizzle-orm';

export function createUser(username: string, password: string) {
	const sqlite = new Database('sqlite.db');
	const db: BetterSQLite3Database = drizzle(sqlite);

	try {
		const user = db.select().from(users).where(eq(users.username, username)).all();

		if (user[0]) {
			return {
				error: true,
				message: 'User already exists.'
			};
		}

		const id = db
			.insert(users)
			.values({ username: username, password: password })
			.returning({ InsertedId: users.username })
			.get();

		console.log(id);
	} catch (error) {
		console.error(error);
		return {
			error: true,
			message: 'An error occurred while creating the user.'
		};
	}

	return {
		error: false,
		message: 'User created successfully.'
	};
}
