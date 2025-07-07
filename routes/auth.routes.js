import express from "express"
import { loginUser, registerUser } from "../controllers/user.controller.js"

 const routes = express.Router()


routes.route("/login").get(loginUser)
routes.route("/signUp").post(registerUser)


export default routes;