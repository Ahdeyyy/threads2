import lucia from 'lucia-auth';
import { sveltekit } from 'lucia-auth/middleware';
import { dev } from '$app/environment';
import sqlite from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

import { betterSqlite3 } from '@lucia-auth/adapter-sqlite';

const database = sqlite('sqlite.db');

const db = drizzle(database);

export const auth = lucia({
	adapter: betterSqlite3(database),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	transformDatabaseUser: (userData) => {
		return {
			userId: userData.id,
			username: userData.username
		};
	}
});

export type Auth = typeof auth;
