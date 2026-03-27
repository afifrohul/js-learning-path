import express from 'express';
import {
  createBook,
  deleteBook,
  editNoteById,
  getBookById,
  getBooks,
} from './controller.js';

const router = express.Router();
router.post('/books', createBook);
router.get('/books', getBooks);
router.get('/books/:id', getBookById);
router.put('/books/:id', editNoteById);
router.delete('/books/:id', deleteBook);

export default router;
