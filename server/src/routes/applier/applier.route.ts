import express from 'express';
import {
  addApplier,
  deleteApplier,
  getAllApplier,
  getAllApplierGroupByReceiveStatus,
  getGroupDataByReceiveStatus,
  updateApplier,
} from './applier.controller';
import checkUserRole from '../../middlewares/checkUserRole';
import { check, param } from 'express-validator';

const applierRouter = express.Router();

// /api/v1/applier/...

applierRouter.get('/', getAllApplier);

applierRouter.post('/', checkUserRole('admin', 'editor'), addApplier);

applierRouter.delete(
  '/:id',
  checkUserRole('admin', 'editor'),
  [param('id').notEmpty().withMessage('Item ID is required')],
  deleteApplier
);

applierRouter.patch(
  '/update',
  checkUserRole('admin', 'editor'),
  [
    check('_id', 'id is required').notEmpty().withMessage('Id cannot be empty'),
    check('dmNumber', 'dmNumber is required')
      .notEmpty()
      .withMessage('Id cannot be empty'),
    check('itemCode', 'itemCode is required')
      .notEmpty()
      .withMessage('itemCode cannot be empty'),
    check('proformaInv', 'proformaInv is required')
      .notEmpty()
      .withMessage('proformaInv cannot be empty'),
  ],
  updateApplier
);

applierRouter.get(
  '/analytics/group-send-items-by-year',
  getGroupDataByReceiveStatus
);

applierRouter.get(
  '/analytics/group-data-by-receive-status',
  getAllApplierGroupByReceiveStatus
);

export default applierRouter;
