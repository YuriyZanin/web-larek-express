import { Router } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import { celebrate, Segments } from 'celebrate';
import create from '../controllers/orders';
import { orderSchema } from '../middlewares/validations';

const validateOrderBody = celebrate({
  [Segments.BODY]: orderSchema,
});

const router = Router();

router.post('/', validateOrderBody, create);

export default router;
