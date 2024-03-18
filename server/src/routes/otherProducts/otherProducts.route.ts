import express, { Request, Response } from 'express';
import { addProduct, getAllOtherProduct } from './otherProducts.controller';
import checkUserRole from '../../middlewares/checkUserRole';
import { param, validationResult } from 'express-validator';
import { deleteOtherProductById } from '../../models/otherProducts/otherProducts.model';

const otherProductsRouter = express.Router();

// /api/v1/other-products
otherProductsRouter.get('/', getAllOtherProduct);

otherProductsRouter.post('/', checkUserRole('admin', 'editor'), addProduct);

otherProductsRouter.delete(
  '/:id',
  checkUserRole('admin', 'editor'),
  [param('id').notEmpty().withMessage('Item ID is required')],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    try {
      await deleteOtherProductById(id);
      res.status(200).json({ message: 'Item has been deleted' });
    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong' });
    }
  }
);

export default otherProductsRouter;
