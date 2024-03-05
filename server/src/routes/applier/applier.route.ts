import express, { Request, Response } from 'express';
import {
  addApplier,
  getAllApplier,
  getAllApplierGroupByReceiveStatus,
} from './applier.controller';
import { getAllApplierDB } from '../../models/applier/applier.model';
import groupSendOutByYear from '../../utils/groupSendOutByYear';

const applierRouter = express.Router();

// /api/v1/applier/...

applierRouter.get('/', getAllApplier);

applierRouter.post('/', addApplier);

applierRouter.get(
  '/analytics/group-send-items-by-year',
  async (req: Request, res: Response) => {
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
  }
);

applierRouter.get(
  '/analytics/group-data-by-receive-status',
  getAllApplierGroupByReceiveStatus
);

export default applierRouter;
