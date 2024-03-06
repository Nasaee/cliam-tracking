import express from 'express';
import {
  addApplier,
  deleteApplier,
  getAllApplier,
  getAllApplierGroupByReceiveStatus,
  getGroupDataByReceiveStatus,
} from './applier.controller';
import checkUserRole from '../../middlewares/checkUserRole';

const applierRouter = express.Router();

// /api/v1/applier/...

applierRouter.get('/', getAllApplier);

applierRouter.post('/', checkUserRole('admin', 'editor'), addApplier);

applierRouter.delete('/:id', deleteApplier);

applierRouter.get(
  '/analytics/group-send-items-by-year',
  getGroupDataByReceiveStatus
);

applierRouter.get(
  '/analytics/group-data-by-receive-status',
  getAllApplierGroupByReceiveStatus
);

export default applierRouter;
