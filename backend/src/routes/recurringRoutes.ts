import { Router } from 'express';
import { recurringController } from '../controllers/recurringController';

const router = Router();

router.get('/', recurringController.getAll);
router.post('/', recurringController.create);
router.delete('/:id', recurringController.delete);

export default router;
