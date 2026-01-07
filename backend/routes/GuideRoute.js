import express from 'express';
import { getAllGuides, getGuideById } from '../controllers/GuideController.js';

const guideRouter = express.Router();

guideRouter.get('/', getAllGuides);
guideRouter.get('/:id', getGuideById);

export default guideRouter;
