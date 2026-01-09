import express from 'express';
import { getAllBlogs, getBlogById } from '../controllers/BlogController.js';

const blogRouter = express.Router();

// Public routes - accessible without authentication
blogRouter.get('/', getAllBlogs);
blogRouter.get('/:id', getBlogById);

export default blogRouter;
