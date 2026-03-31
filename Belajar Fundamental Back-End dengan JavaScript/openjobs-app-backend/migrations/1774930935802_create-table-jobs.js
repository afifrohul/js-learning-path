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
  pgm.createTable("jobs", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    company_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    category_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    title: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    description: {
      type: "VARCHAR(100)",
      notNull: true,
    },
    job_type: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    experience_level: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    location_type: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    location_city: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    salary_min: {
      type: "INTEGER",
      notNull: true,
    },
    salary_max: {
      type: "INTEGER",
      notNull: true,
    },
    is_salary_visible: {
      type: "BOOLEAN",
      notNull: true,
    },
    status: {
      type: "VARCHAR(50)",
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
    "jobs",
    "fk_companies.company_id_companies.id",
    "FOREIGN KEY(company_id) REFERENCES companies(id) ON DELETE CASCADE",
  );
  pgm.addConstraint(
    "jobs",
    "fk_categories.category_id_categories.id",
    "FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE CASCADE",
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("jobs");
};
