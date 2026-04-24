import express from "express"
import { connectDB } from "./src/config/db.js";
import dotenv from "dotenv"
import postRoutes from "./src/routes/postsRoutes.js"
import errorHandler from "./src/middleware/errorHandler.js";

dotenv.config();

const app = express();




app.use(express.json())
app.use("/posts",postRoutes)


app.use(errorHandler)

connectDB();

app.listen(process.env.PORT, ()=>{
    console.log(`server listening ${process.env.PORT}`);
})



