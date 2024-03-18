import { Request, Response } from 'express';

import { OtherProductsType } from '../../shares/types';
import {
  deleteOtherProductById,
  findOtherProductById,
  getAllOtherProductDB,
  saveOtherProducts,
  updateOtherProductItem,
} from '../../models/otherProducts/otherProducts.model';
import { validationResult } from 'express-validator';

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

export const updateProduct = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array(),
    });
  }

  const item = findOtherProductById(req.body._id);
  if (!item) return res.status(400).send({ message: 'Item not found' });

  try {
    const updatedItem = await updateOtherProductItem(req.body);
    res.status(200).json(updatedItem);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Something went wrong' });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;

  const item = findOtherProductById(id);

  if (!item) return res.status(400).send({ message: 'Item not found' });

  try {
    await deleteOtherProductById(id);
    res.status(200).json({ message: 'Item has been deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
