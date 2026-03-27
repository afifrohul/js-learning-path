import { Router } from 'express';
import notes from '../services/notes/routes/index.js';

const router = Router();

router.get('/', (req, res) => {
  return res.json({
    status: 'success',
    message: 'Backend server successfully running!'
  });
});

router.use('/', notes);


export default router;