import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Subscription table
export const subscriptions = mysqlTable("subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  planType: mysqlEnum("planType", ["TRIAL", "MONTHLY", "ANNUAL"]).notNull(),
  startDate: timestamp("startDate").defaultNow().notNull(),
  endDate: timestamp("endDate").notNull(),
  status: mysqlEnum("status", ["ACTIVE", "CANCELED", "EXPIRED"]).default("ACTIVE").notNull(),
  paymentGatewayId: varchar("paymentGatewayId", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = typeof subscriptions.$inferInsert;

// Category table
export const categories = mysqlTable("categories", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  iconUrl: varchar("iconUrl", { length: 512 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

// Program table (Jornadas)
export const programs = mysqlTable("programs", {
  id: int("id").autoincrement().primaryKey(),
  categoryId: int("categoryId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  coverImageUrl: varchar("coverImageUrl", { length: 512 }),
  totalDurationSeconds: int("totalDurationSeconds").default(0),
  totalContentCount: int("totalContentCount").default(0),
  isDailyStorie: boolean("isDailyStorie").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Program = typeof programs.$inferSelect;
export type InsertProgram = typeof programs.$inferInsert;

// Content table (Áudios/Vídeos)
export const contents = mysqlTable("contents", {
  id: int("id").autoincrement().primaryKey(),
  programId: int("programId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  mediaType: mysqlEnum("mediaType", ["AUDIO", "VIDEO"]).notNull(),
  durationSeconds: int("durationSeconds").notNull(),
  cdnUrl: varchar("cdnUrl", { length: 512 }),
  orderInProgram: int("orderInProgram").notNull(),
  isPremium: boolean("isPremium").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Content = typeof contents.$inferSelect;
export type InsertContent = typeof contents.$inferInsert;

// User Content Progress table
export const userContentProgress = mysqlTable("userContentProgress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  contentId: int("contentId").notNull(),
  currentTimeSeconds: int("currentTimeSeconds").default(0),
  isCompleted: boolean("isCompleted").default(false),
  lastPlayedAt: timestamp("lastPlayedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserContentProgress = typeof userContentProgress.$inferSelect;
export type InsertUserContentProgress = typeof userContentProgress.$inferInsert;

// User Download table
export const userDownloads = mysqlTable("userDownloads", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  contentId: int("contentId").notNull(),
  downloadedAt: timestamp("downloadedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type UserDownload = typeof userDownloads.$inferSelect;
export type InsertUserDownload = typeof userDownloads.$inferInsert;

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  subscriptions: many(subscriptions),
  contentProgress: many(userContentProgress),
  downloads: many(userDownloads),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  programs: many(programs),
}));

export const programsRelations = relations(programs, ({ one, many }) => ({
  category: one(categories, {
    fields: [programs.categoryId],
    references: [categories.id],
  }),
  contents: many(contents),
}));

export const contentsRelations = relations(contents, ({ one, many }) => ({
  program: one(programs, {
    fields: [contents.programId],
    references: [programs.id],
  }),
  userProgress: many(userContentProgress),
  downloads: many(userDownloads),
}));

export const userContentProgressRelations = relations(userContentProgress, ({ one }) => ({
  user: one(users, {
    fields: [userContentProgress.userId],
    references: [users.id],
  }),
  content: one(contents, {
    fields: [userContentProgress.contentId],
    references: [contents.id],
  }),
}));

export const userDownloadsRelations = relations(userDownloads, ({ one }) => ({
  user: one(users, {
    fields: [userDownloads.userId],
    references: [users.id],
  }),
  content: one(contents, {
    fields: [userDownloads.contentId],
    references: [contents.id],
  }),
}));