/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable("companies", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    name: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    location: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    description: {
      type: "VARCHAR(100)",
      notNull: true,
    },
    created_at: {
      type: "TIMESTAMP",
      notNull: true,
    },
    updated_at: {
      type: "TIMESTAMP",
      notNull: true,
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("companies");
};
