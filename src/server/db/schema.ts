// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `ai-search_${name}`);

export const users = createTable(
  "users", // Renamed "user" to "users"
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 12 }),
  }
);

export const search = createTable(
  "search",
  {
    id: serial("id").primaryKey(),
    search: varchar("search", { length: 100 }),
    output: varchar("output", { length: 2048 }),
    user_id: integer("user_id").notNull().references(() => users.id),
  }
);
