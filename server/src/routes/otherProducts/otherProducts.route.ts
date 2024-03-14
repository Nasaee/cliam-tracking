import express from 'express';
import { addProduct } from './otherProducts.controller';
import checkUserRole from '../../middlewares/checkUserRole';

const otherProductsRouter = express.Router();

// /api/v1/other-products
otherProductsRouter.post('/', checkUserRole('admin', 'editor'), addProduct);

export default otherProductsRouter;
