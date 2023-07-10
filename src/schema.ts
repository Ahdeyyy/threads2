import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

export const users = sqliteTable('auth_user', {
	id: text("id").primaryKey(),
	username: text('username'),
	password: text('password')
});

export const session = sqliteTable("auth_session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => users.id),
	activeExpires: integer("active_expires").notNull(),
	idleExpires: integer("idle_expires").notNull()
});

export const key = sqliteTable("auth_key", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => users.id),
	primaryKey: integer("primary_key").notNull(),
	hashedPassword: text("hashed_password"),
	expires: integer("expires")
});


export const threads = sqliteTable('threads', {
	id: integer('id').primaryKey({autoIncrement: true}),
	authorId: text('author_id'),
	views: integer('views').default(0),
	likes: integer('likes').default(0),
	quotes: integer('quotes').default(0),
	content: text('content').default('')
});

export const bookmarks = sqliteTable('bookmarks', {
	id: integer('id').primaryKey({autoIncrement: true}),
	authorId: text('author_id'),
	threadId: integer('thread_id')
});

export const quotes = sqliteTable('quotes', {
	id: integer('id').primaryKey({autoIncrement: true}),
	authorId: text('author_id'),
	threadId: integer('thread_id')
});

export const userRelations = relations(users, ({ many }) => ({
	threads: many(threads),
	quotes: many(threads),
	bookmarks: many(threads)
}));

export const threadsRelations = relations(threads, ({ one }) => ({
	author: one(users, {
		fields: [threads.authorId],
		references: [users.id]
	})
}));

export const bookmarksRelations = relations(bookmarks, ({ one }) => ({
	author: one(users, {
		fields: [bookmarks.authorId],
		references: [users.id]
	})
}));

export const quotesRelations = relations(quotes, ({ one }) => ({
	author: one(users, {
		fields: [quotes.authorId],
		references: [users.id]
	})
}));
