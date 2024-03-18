import express, { Request, Response } from 'express';
import {
  addProduct,
  deleteItem,
  getAllOtherProduct,
  updateProduct,
} from './otherProducts.controller';
import checkUserRole from '../../middlewares/checkUserRole';
import { check, param } from 'express-validator';

const otherProductsRouter = express.Router();

// /api/v1/other-products
otherProductsRouter.get('/', getAllOtherProduct);

otherProductsRouter.post('/', checkUserRole('admin', 'editor'), addProduct);

otherProductsRouter.patch(
  '/update',
  checkUserRole('admin', 'editor'),
  [
    check('_id', 'id is required').notEmpty().withMessage('Id cannot be empty'),
    check('dmNumber', 'dmNumber is required')
      .notEmpty()
      .withMessage('Id cannot be empty'),
    check('itemCode', 'itemCode is required')
      .notEmpty()
      .withMessage('itemCode cannot be empty'),
    check('quantity', 'quantity is required')
      .isNumeric()
      .withMessage('quantity cannot be empty'),
    check('proformaInv', 'proformaInv is required')
      .notEmpty()
      .withMessage('proformaInv cannot be empty'),
  ],
  updateProduct
);

otherProductsRouter.delete(
  '/:id',
  checkUserRole('admin', 'editor'),
  [param('id').notEmpty().withMessage('Item ID is required')],
  deleteItem
);

export default otherProductsRouter;
