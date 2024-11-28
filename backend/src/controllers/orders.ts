import { Request, Response, NextFunction } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';

import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';

const { ObjectId } = require('mongoose').Types;

const create = async (req: Request, res: Response, next: NextFunction) => {
  const { total, items } = req.body;
  const id = faker.string.uuid();
  let totalFromDb = 0;

  await Promise.all(
    items.map(async (itemId: string) => {
      const product = await Product.findById({ _id: new ObjectId(itemId) });
      if (!product) {
        return next(new BadRequestError(`Товар ${itemId} не найден`));
      }
      if (product.price === null) {
        return next(new BadRequestError('Не указана цена товара'));
      }
      totalFromDb += product.price;
      return totalFromDb;
    }),
  )
    .then(() => {
      if (total !== totalFromDb) {
        return next(
          new BadRequestError('Не совпадает итоговая стоимость товаров'),
        );
      }
      return res.status(200).send({ id, total: totalFromDb });
    })
    .catch((error) => next(new BadRequestError(error)));
};

export default create;
