import { Router } from 'express';
import { incomeController } from '../controllers/incomeController';

const router = Router();

router.get('/', incomeController.getAll);
router.post('/', incomeController.create);
router.delete('/:id', incomeController.delete);

export default router;
