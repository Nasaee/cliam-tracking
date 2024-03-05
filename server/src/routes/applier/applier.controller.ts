import { Request, Response } from 'express';
import { getAllApplierDB } from '../../models/applier/applier.model';
import groupDataByReceiveStatus from '../../utils/compaireReceiveStatus';

export const getAllApplier = async (_req: Request, res: Response) => {
  try {
    const allApplier = await getAllApplierDB();
    res.status(200).json(allApplier);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
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
