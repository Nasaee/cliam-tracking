import express from 'express';
import { addProduct } from './otherProducts.controller';
import checkUserRole from '../../middlewares/checkUserRole';
import { check } from 'express-validator';

const otherProductsRouter = express.Router();

otherProductsRouter.post(
  '/',
  checkUserRole('admin', 'editor'),
  [
    check('dmNumber', 'dmNumber is required').notEmpty().isString(),
    check('itemCode', 'itemCode is required').notEmpty(),
    check('quantity', 'quantity is required').notEmpty().isNumeric(),
    check('proformaInv', 'proformaInv is required').notEmpty().isString(),
  ],
  addProduct
);

export default otherProductsRouter;
