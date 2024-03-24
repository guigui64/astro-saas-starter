import { column, defineDb, defineTable, NOW } from "astro:db";

export const User = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    email: column.text({ unique: true, optional: true }),
    avatar: column.text({ optional: true }),
    updatedAt: column.date({ default: NOW, nullable: true }),
    createdAt: column.date({ default: NOW, nullable: true }),
  },
});

export const Session = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    userId: column.number({ references: () => User.columns.id }),
    expiresAt: column.date(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { User, Session },
});
