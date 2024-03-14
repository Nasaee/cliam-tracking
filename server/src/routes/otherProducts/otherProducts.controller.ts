import { Request, Response } from 'express';
import { addProductDB } from '../../models/otherProducts/otherProducts.model';
import { OtherProductsType } from '../../shares/types';

export const addProduct = (req: Request, res: Response) => {
  const newItems = req.body as OtherProductsType[];

  console.log('req.body', newItems);
};
