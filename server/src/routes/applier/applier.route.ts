import express, { Request, Response } from 'express';
import { getAllApplier } from './applier.controller';
import verifyToken from '../../middlewares/verifyToken.middleware';
import checkUserRole from '../../middlewares/checkUserRole';
import { getAllApplierDB } from '../../models/applier/applier.model';
import compaireReceiveStatus from '../../utils/compaireReceiveStatus';
import groupSendOutByYear from '../../utils/compaireReceiveStatus';

const applierRouter = express.Router();

// /api/v1/applier/...

applierRouter.get('/', getAllApplier);

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

export default applierRouter;
