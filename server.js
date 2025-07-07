import express from "express"
import dotenv from "dotenv"
import testingRoutes from "./routes/testing.route.js";
import contactsRoutes from "./routes/contacts.routes.js"
import userRoutes from "./routes/auth.routes.js";
import { errorhandler } from "./middleware/errorhandler.js";
import { dbConnection } from "./config/DbConnection.config.js";
import cookieParser from "cookie-parser";
import { verifyToken } from "./middleware/Token.middleware.js";
dotenv.config()



const app = express();
const port = process.env.PORT || 8081;



dbConnection()


app.use(cookieParser())
app.use(express.json());
app.use("/api/test", testingRoutes)
app.use("/api/contacts",verifyToken, contactsRoutes)
app.use("/api/user", userRoutes)
app.use(errorhandler)

app.listen(port, () => {
    console.log(`app is listening on port no. ${port} \n link:- http://localhost:${port}`);
})