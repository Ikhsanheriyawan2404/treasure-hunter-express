import { Router } from "express";
import UserController from "./../controlles/UserController";

const routes = Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.register);
routes.post('/login', UserController.login);

export default routes;