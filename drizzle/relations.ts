import { relations } from "drizzle-orm/relations";
import { backtestSessions, backtestPositions, localUsers, backtestTrades, users, trackedPeople, watchlist } from "./schema";

export const backtestPositionsRelations = relations(backtestPositions, ({one}) => ({
	backtestSession: one(backtestSessions, {
		fields: [backtestPositions.sessionId],
		references: [backtestSessions.id]
	}),
}));

export const backtestSessionsRelations = relations(backtestSessions, ({one, many}) => ({
	backtestPositions: many(backtestPositions),
	localUser: one(localUsers, {
		fields: [backtestSessions.localUserId],
		references: [localUsers.id]
	}),
	backtestTrades: many(backtestTrades),
}));

export const localUsersRelations = relations(localUsers, ({many}) => ({
	backtestSessions: many(backtestSessions),
}));

export const backtestTradesRelations = relations(backtestTrades, ({one}) => ({
	backtestSession: one(backtestSessions, {
		fields: [backtestTrades.sessionId],
		references: [backtestSessions.id]
	}),
}));

export const trackedPeopleRelations = relations(trackedPeople, ({one}) => ({
	user: one(users, {
		fields: [trackedPeople.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	trackedPeople: many(trackedPeople),
	watchlists: many(watchlist),
}));

export const watchlistRelations = relations(watchlist, ({one}) => ({
	user: one(users, {
		fields: [watchlist.userId],
		references: [users.id]
	}),
}));