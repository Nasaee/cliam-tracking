import { Request, Response } from 'express';
import { getAllApplierDB } from '../../models/applier/applier.model';

export const getAllApplier = async (req: Request, res: Response) => {
  try {
    const allApplier = await getAllApplierDB();
    res.status(200).json(allApplier);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
