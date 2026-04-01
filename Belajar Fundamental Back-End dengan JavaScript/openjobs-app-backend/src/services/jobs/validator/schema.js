import Joi from "joi";

export const postJobPayloadSchema = Joi.object({
  company_id: Joi.string().required(),
  category_id: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  job_type: Joi.string().required(),
  experience_level: Joi.string().required(),
  location_type: Joi.string().required(),
  location_city: Joi.string(),
  salary_min: Joi.number().integer(),
  salary_max: Joi.number().integer(),
  is_salary_visible: Joi.boolean(),
  status: Joi.string().required(),
});

export const putJobPayloadSchema = Joi.object({
  company_id: Joi.string(),
  category_id: Joi.string(),
  title: Joi.string().required(),
  description: Joi.string(),
  job_type: Joi.string(),
  experience_level: Joi.string(),
  location_type: Joi.string(),
  location_city: Joi.string(),
  salary_min: Joi.number().integer(),
  salary_max: Joi.number().integer(),
  is_salary_visible: Joi.boolean(),
  status: Joi.string(),
});

export const queryJobSchema = Joi.object({
  title: Joi.string().allow("", null),
  "company-name": Joi.string().allow("", null),
});
