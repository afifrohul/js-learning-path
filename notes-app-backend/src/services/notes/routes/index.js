import express from 'express';
import {
  createNote,
  deleteNoteById,
  editNoteById,
  getNoteById,
  getNotes,
} from '../controllers/note-controller.js';
import { validate, validateQuery } from '../../../middlewares/validate.js';
import authenticateToken from '../../../middlewares/auth.js';
import { notePayloadSchema, noteQuerySchema } from '../../../services/notes/validator/schema.js';

const router = express.Router();

router.post('/notes', authenticateToken, validate(notePayloadSchema), createNote);
router.get('/notes', authenticateToken, validateQuery(noteQuerySchema), getNotes);
router.get('/notes/:id', authenticateToken, getNoteById);
router.put('/notes/:id', authenticateToken, validate(notePayloadSchema), editNoteById);
router.delete('/notes/:id', authenticateToken, deleteNoteById);

export default router;