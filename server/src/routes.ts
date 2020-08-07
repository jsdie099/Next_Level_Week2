import express from 'express';
import ClassController from './controllers/ClassController';
import UserController from './controllers/UserController';
import ConnectionController from './controllers/ConnectionController';
const routes = express.Router();

import { Joi, Segments, celebrate } from 'celebrate';


const classController = new ClassController();
const userController = new UserController();
const connectionController = new ConnectionController();

routes.get("/users",userController.index);


routes.get("/classes",celebrate({
    [Segments.QUERY]: Joi.object({
        week_day: Joi.string(),
        subject: Joi.string(),
        time: Joi.string()
    }).unknown()
}),classController.index);


routes.post("/classes",celebrate({
    [Segments.BODY]: Joi.object({
        name: Joi.string().required(),
        avatar: Joi.string().required(),
        whatsapp: Joi.string().required(),
        bio: Joi.string().required(),
        subject: Joi.string().required(),
        cost: Joi.number().required()
    }).unknown()
}),classController.create);


routes.post("/connections",celebrate({
    [Segments.BODY]: Joi.object({        
        user_id: Joi.number().required()
    }).unknown()
}),connectionController.create);
routes.get("/connections",connectionController.index);
export default routes;