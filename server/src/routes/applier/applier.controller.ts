import { Request, Response } from 'express';
import {
  getAllApplierDB,
  saveApplierItem,
} from '../../models/applier/applier.model';
import groupDataByReceiveStatus from '../../utils/compaireReceiveStatus';
import { ApplierType } from '../../models/applier/applier.mongo';

export const getAllApplier = async (_req: Request, res: Response) => {
  try {
    const allApplier = await getAllApplierDB();
    res.status(200).json(allApplier);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const addApplier = async (req: Request, res: Response) => {
  const newItems = req.body as ApplierType[];
  try {
    await saveApplierItem(newItems);
    res.status(200).send({ message: 'Add item succeeded' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Somthing went wrong');
  }
};

export const getAllApplierGroupByReceiveStatus = async (
  _req: Request,
  res: Response
) => {
  try {
    const allApplier = await getAllApplierDB();
    const groupData = groupDataByReceiveStatus(allApplier);
    res.status(200).json(groupData);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
