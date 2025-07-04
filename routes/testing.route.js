import express from "express";
import { testing } from "../controllers/testing.controllers.js";

const testingRouter = express.Router()

testingRouter.route("/testing").post(testing)


export default testingRouter;