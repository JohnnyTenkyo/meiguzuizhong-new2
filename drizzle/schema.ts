import { mysqlTable, mysqlSchema, AnyMySqlColumn, foreignKey, bigint, int, varchar, decimal, timestamp, mysqlEnum, index, text } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const backtestPositions = mysqlTable("backtest_positions", {
	id: int().autoincrement().notNull(),
	sessionId: int().notNull().references(() => backtestSessions.id, { onDelete: "cascade" } ),
	symbol: varchar({ length: 20 }).notNull(),
	quantity: int().default(0).notNull(),
	avgCost: decimal({ precision: 16, scale: 4 }).notNull(),
	totalCost: decimal({ precision: 16, scale: 2 }).notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().onUpdateNow().notNull(),
});

export const backtestSessions = mysqlTable("backtest_sessions", {
	id: int().autoincrement().notNull(),
	localUserId: int().notNull().references(() => localUsers.id, { onDelete: "cascade" } ),
	name: varchar({ length: 128 }).notNull(),
	initialBalance: decimal({ precision: 16, scale: 2 }).notNull(),
	currentBalance: decimal({ precision: 16, scale: 2 }).notNull(),
	totalAssets: decimal({ precision: 16, scale: 2 }),
	totalPnL: decimal({ precision: 16, scale: 2 }),
	totalPnLpercent: decimal({ precision: 10, scale: 4 }),
	startDate: bigint({ mode: "number" }).notNull(),
	currentDate: bigint({ mode: "number" }).notNull(),
	currentInterval: varchar({ length: 10 }).default('1d'),
	status: mysqlEnum(['active','archived']).default('active').notNull(),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().onUpdateNow().notNull(),
});

export const backtestTrades = mysqlTable("backtest_trades", {
	id: int().autoincrement().notNull(),
	sessionId: int().notNull().references(() => backtestSessions.id, { onDelete: "cascade" } ),
	symbol: varchar({ length: 20 }).notNull(),
	type: mysqlEnum(['buy','sell']).notNull(),
	quantity: int().notNull(),
	price: decimal({ precision: 16, scale: 4 }).notNull(),
	amount: decimal({ precision: 16, scale: 2 }).notNull(),
	tradeDate: bigint({ mode: "number" }).notNull(),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
});

export const localUsers = mysqlTable("local_users", {
	id: int().autoincrement().notNull(),
	username: varchar({ length: 64 }).notNull(),
	passwordHash: varchar({ length: 256 }).notNull(),
	name: varchar({ length: 128 }),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	lastSignedIn: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
},
(table) => [
	index("local_users_username_unique").on(table.username),
]);

export const socialMediaCache = mysqlTable("social_media_cache", {
	id: int().autoincrement().notNull(),
	platform: mysqlEnum(['twitter','truthsocial']).notNull(),
	handle: varchar({ length: 64 }).notNull(),
	postId: varchar({ length: 64 }).notNull(),
	content: text().notNull(),
	contentZh: text(),
	createdAt: timestamp({ mode: 'string' }).notNull(),
	metrics: text(),
	url: text(),
	media: text(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	cachedAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
});

export const trackedPeople = mysqlTable("tracked_people", {
	id: int().autoincrement().notNull(),
	userId: int().notNull().references(() => users.id, { onDelete: "cascade" } ),
	name: varchar({ length: 128 }).notNull(),
	nameZh: varchar({ length: 128 }),
	title: varchar({ length: 256 }),
	titleZh: varchar({ length: 256 }),
	twitterHandle: varchar({ length: 64 }),
	truthSocialHandle: varchar({ length: 64 }),
	category: mysqlEnum(['政治','科技','金融','商业','其他']).default('其他').notNull(),
	avatarEmoji: varchar({ length: 10 }).default('👤'),
	addedAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().onUpdateNow().notNull(),
});

export const users = mysqlTable("users", {
	id: int().autoincrement().notNull(),
	openId: varchar({ length: 64 }).notNull(),
	name: text(),
	email: varchar({ length: 320 }),
	loginMethod: varchar({ length: 64 }),
	role: mysqlEnum(['user','admin']).default('user').notNull(),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	updatedAt: timestamp({ mode: 'string' }).defaultNow().onUpdateNow().notNull(),
	lastSignedIn: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
},
(table) => [
	index("users_openId_unique").on(table.openId),
]);

export const watchlist = mysqlTable("watchlist", {
	id: int().autoincrement().notNull(),
	userId: int().notNull().references(() => users.id, { onDelete: "cascade" } ),
	symbol: varchar({ length: 20 }).notNull(),
	addedAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
});
