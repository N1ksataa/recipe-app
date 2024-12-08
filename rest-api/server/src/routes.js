import { Router } from 'express';
import userController from './controllers/userController.js';
import recipeController from './controllers/recipeController.js';

const routes = Router();

routes.use('/users', userController);
routes.use('/recipes', recipeController);


export default routes;