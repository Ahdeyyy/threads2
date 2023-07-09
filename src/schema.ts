import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

export const users = sqliteTable('users', {
	id: integer('id').primaryKey(),
	username: text('username'),
	password: text('password')
});


export const threads = sqliteTable('threads', {
	id: integer('id').primaryKey(),
	authorId: integer('author_id'),
	views: integer('views').default(0),
	likes: integer('likes').default(0),
	quotes: integer('quotes').default(0),
	content: text('content').default('')
});

export const bookmarks = sqliteTable('bookmarks', {
	id: integer('id').primaryKey(),
	authorId: integer('author_id'),
	threadId: integer('thread_id')
});

export const quotes = sqliteTable('quotes', {
	id: integer('id').primaryKey(),
	authorId: integer('author_id'),
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
