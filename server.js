import express from "express"
import dotenv from "dotenv"
import testingRoutes from "./routes/testing.route.js";
import contactsRoutes from "./routes/contacts.routes.js"
import { errorhandler } from "./middleware/errorhandler.js";
import { dbConnection } from "./config/DbConnection.config.js";
dotenv.config()


const app = express();
const port = process.env.PORT || 8081;

dbConnection()

app.use(express.json());
app.use("/api/test", testingRoutes)
app.use("/api/contacts", contactsRoutes)
app.use(errorhandler)

app.listen(port, () => {
    console.log(`app is listening on port no. ${port} \n link:- http://localhost:${port}`);
})