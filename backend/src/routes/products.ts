import { Router } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import { celebrate, Segments } from 'celebrate';
import { create, getAll } from '../controllers/products';
import { productSchema } from '../middlewares/validations';

const validateProductBody = celebrate({
  [Segments.BODY]: productSchema,
});

const router = Router();
router.get('/', getAll);
router.post('/', validateProductBody, create);

export default router;
