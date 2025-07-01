import { Router } from "express";
import { subscribe } from "../controllers/newsletter.controller.js";

const newsletterRouter = Router();

newsletterRouter.post('/subscribe', subscribe);

export default newsletterRouter;