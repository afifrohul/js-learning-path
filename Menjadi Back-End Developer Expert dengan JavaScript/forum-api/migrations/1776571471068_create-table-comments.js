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
  pgm.createTable("comments", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    comment_id: {
      type: "VARCHAR(50)",
      notNull: false,
    },
    user_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    thread_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    content: {
      type: "VARCHAR(255)",
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
    deleted_at: {
      type: "TIMESTAMP",
      notNull: false,
    },
  });

  pgm.addConstraint(
    "comments",
    "fk_comments.parent_comments.id",
    "FOREIGN KEY(comment_id) REFERENCES comments(id) ON DELETE CASCADE",
  );

  pgm.addConstraint(
    "comments",
    "fk_comments.owner_users.id",
    "FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE",
  );

  pgm.addConstraint(
    "comments",
    "fk_comments.owner_threads.id",
    "FOREIGN KEY(thread_id) REFERENCES threads(id) ON DELETE CASCADE",
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("comments");
};
