import { Request, Response } from 'express';
import {
  deleteApplierById,
  findApplierById,
  getAllApplierDB,
  saveApplierItem,
  updateApplierDB,
} from '../../models/applier/applier.model';
import groupDataByReceiveStatus from '../../utils/compaireReceiveStatus';
import groupSendOutByYear from '../../utils/groupSendOutByYear';
import { validationResult } from 'express-validator';
import { ApplierType } from '../../shares/types';
import {
  deleteOtherProductById,
  findOtherProductById,
} from '../../models/otherProducts/otherProducts.model';

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
    res.status(201).send({ message: 'Add item succeeded' });
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

export const updateApplier = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array(),
    });
  }

  const itemId = req.body._id;
  const userId = req.user.userId;
  const updateApplierData = req.body;

  const existingItem = await findApplierById(itemId);
  if (!existingItem) res.status(400).send({ message: 'Item not found' });
  try {
    const updated = await updateApplierDB(updateApplierData, userId);
    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Something went wrong' });
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

export const deleteOtherProduct = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.params;

  const product = findApplierById(id);

  if (!product) return res.status(400).send({ message: 'Item not found' });
  try {
    await deleteOtherProductById(id);
    return res.status(200).send({ message: 'Item has been deleted' });
  } catch (error) {
    return res.status(500).send({ message: 'something went wrong' });
  }
};
