import express from 'express';
import { getAllApplier } from './applier.controller';

const applierRouter = express.Router();

// /api/v1/applier/...

applierRouter.get('/', getAllApplier);

export default applierRouter;
