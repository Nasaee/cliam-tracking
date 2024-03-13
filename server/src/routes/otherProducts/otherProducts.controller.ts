import { Request, Response } from 'express';
import { OtherProductsType } from '../../shares/types';

export const addProduct = (req: Request, res: Response) => {
  console.log(req.body);

  //   const newProduct = req.body as OtherProductsType;
};
