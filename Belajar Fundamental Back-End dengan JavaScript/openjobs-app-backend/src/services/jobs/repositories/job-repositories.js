import { nanoid } from "nanoid";
import { Pool } from "pg";

class JobRepositories {
  constructor() {
    this.pool = new Pool();
  }

  async getJobs(title, company_name) {
    let baseQuery = `
      SELECT jobs.*, companies.name AS company_name
      FROM jobs
      LEFT JOIN companies ON jobs.company_id = companies.id
    `;

    const conditions = [];
    const values = [];
    let index = 1;

    if (title) {
      conditions.push(`jobs.title ILIKE $${index++}`);
      values.push(`%${title}%`);
    }

    if (company_name) {
      conditions.push(`companies.name ILIKE $${index++}`);
      values.push(`%${company_name}%`);
    }

    if (conditions.length > 0) {
      baseQuery += ` WHERE ` + conditions.join(" AND ");
    }

    const result = await this.pool.query({
      text: baseQuery,
      values,
    });

    return result.rows;
  }

  async getJobById(id) {
    const query = {
      text: "SELECT * FROM jobs WHERE id = $1",
      values: [id],
    };

    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async getJobsByCompanyId(companyId) {
    const query = {
      text: "SELECT * FROM jobs WHERE company_id = $1",
      values: [companyId],
    };

    const result = await this.pool.query(query);
    return result.rows;
  }

  async getJobsByCategoryId(categoryId) {
    const query = {
      text: "SELECT * FROM jobs WHERE category_id = $1",
      values: [categoryId],
    };

    const result = await this.pool.query(query);
    return result.rows;
  }

  async createJob({
    company_id,
    category_id,
    title,
    description,
    job_type,
    experience_level,
    location_type,
    location_city,
    salary_min,
    salary_max,
    is_salary_visible,
    status,
  }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: `INSERT INTO jobs(
      id, 
      company_id, 
      category_id, 
      title, 
      description, 
      job_type, 
      experience_level, 
      location_type, 
      location_city, 
      salary_min, 
      salary_max, 
      is_salary_visible, 
      status, 
      created_at, 
      updated_at
      ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING id`,
      values: [
        id,
        company_id,
        category_id,
        title,
        description,
        job_type,
        experience_level,
        location_type,
        location_city,
        salary_min,
        salary_max,
        is_salary_visible,
        status,
        createdAt,
        updatedAt,
      ],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async editJobById({
    id,
    company_id,
    category_id,
    title,
    description,
    job_type,
    experience_level,
    location_type,
    location_city,
    salary_min,
    salary_max,
    is_salary_visible,
    status,
  }) {
    const updatedAt = new Date().toISOString();

    const query = {
      text: `UPDATE jobs SET
        company_id = COALESCE($2, company_id),
        category_id = COALESCE($3, category_id),
        title = COALESCE($4, title),
        description = COALESCE($5, description),
        job_type = COALESCE($6, job_type),
        experience_level = COALESCE($7, experience_level),
        location_type = COALESCE($8, location_type),
        location_city = COALESCE($9, location_city),
        salary_min = COALESCE($10, salary_min),
        salary_max = COALESCE($11, salary_max),
        is_salary_visible = COALESCE($12, is_salary_visible),
        status = COALESCE($13, status),
        updated_at = $14
      WHERE id = $1
      RETURNING id`,
      values: [
        id,
        company_id,
        category_id,
        title,
        description,
        job_type,
        experience_level,
        location_type,
        location_city,
        salary_min,
        salary_max,
        is_salary_visible,
        status,
        updatedAt,
      ],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async deleteJobById(id) {
    const query = {
      text: "DELETE FROM jobs WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this.pool.query(query);
    return result.rows[0];
  }
}

export default new JobRepositories();
