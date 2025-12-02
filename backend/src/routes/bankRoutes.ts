import { Router } from 'express';
import { bankController } from '../controllers/bankController';

const router = Router();

router.get('/', bankController.getAll);
router.get('/:id', bankController.getById);
router.post('/', bankController.create);
router.put('/:id', bankController.update);
router.delete('/:id', bankController.delete);

export default router;
