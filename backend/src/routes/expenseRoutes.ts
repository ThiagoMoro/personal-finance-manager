import { Router } from 'express';
import { expenseController } from '../controllers/expenseController';

const router = Router();

router.get('/', expenseController.getAll);
router.post('/', expenseController.create);
router.delete('/:id', expenseController.delete);

export default router;
