import { Request, Response } from 'express';

import { OtherProductsType } from '../../shares/types';
import {
  getAllOtherProductDB,
  saveOtherProducts,
} from '../../models/otherProducts/otherProducts.model';

export const addProduct = async (req: Request, res: Response) => {
  const newItems = req.body as OtherProductsType[];

  try {
    await saveOtherProducts(newItems);
    res.status(201).send({ message: 'Add item succeeded' });
  } catch (error) {
    res.status(500).send('Somthing went wrong');
  }
};

export const getAllOtherProduct = async (_req: Request, res: Response) => {
  try {
    const allProducts = await getAllOtherProductDB();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
