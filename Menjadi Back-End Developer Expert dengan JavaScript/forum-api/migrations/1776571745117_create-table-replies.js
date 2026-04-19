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
  pgm.createTable("replies", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    user_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    thread_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    comment_id: {
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
  });

  pgm.addConstraint(
    "replies",
    "fk_replies.owner_users.id",
    "FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE",
  );

  pgm.addConstraint(
    "replies",
    "fk_replies.owner_threads.id",
    "FOREIGN KEY(thread_id) REFERENCES threads(id) ON DELETE CASCADE",
  );

  pgm.addConstraint(
    "replies",
    "fk_replies.owner_comments.id",
    "FOREIGN KEY(comment_id) REFERENCES comments(id) ON DELETE CASCADE",
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("replies");
};
