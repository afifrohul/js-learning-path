import express from 'express';
import {
  createUser,
  getUserById,
} from '../controllers/user-controller.js';
import { validate } from '../../../middlewares/validate.js';
import { userPayloadSchema } from '../../../services/users/validator/schema.js';

const router = express.Router();

router.post('/users', validate(userPayloadSchema), createUser);
router.get('/users/:id', getUserById);

export default router;