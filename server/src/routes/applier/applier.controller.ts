import { Request, Response } from 'express';
import {
  deleteApplierById,
  getAllApplierDB,
  saveApplierItem,
} from '../../models/applier/applier.model';
import groupDataByReceiveStatus from '../../utils/compaireReceiveStatus';
import { ApplierType } from '../../models/applier/applier.mongo';
import groupSendOutByYear from '../../utils/groupSendOutByYear';

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

export const deleteApplier = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(500).send({ message: 'bed request' });

  try {
    await deleteApplierById(id);
    return res.status(200).send({ message: 'Applier has been deleted' });
  } catch (error) {
    return res.status(500).send({ message: 'bed request' });
  }
};

export const getGroupDataByReceiveStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const allApplier = await getAllApplierDB();
    if (!allApplier) {
      return res.status(500).send({ message: 'Something went wrong' });
    }

    const sendOutItemsAmount = groupSendOutByYear(allApplier);

    return res.status(200).send(sendOutItemsAmount);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong' });
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
