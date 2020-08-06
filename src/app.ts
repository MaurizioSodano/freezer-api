import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import todoRoutes from "./routes/todos";
import itemRoutes from "./routes/items";
require('dotenv').config()
//import * as cors from "cors";
import connect from './mongo/connect';

import { json } from "body-parser"


const app = express();
/* //get router
var router = express.Router();

//options for cors midddleware
const options:cors.CorsOptions = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  //origin: API_URL,
  preflightContinue: false
};

//use cors middleware
router.use(cors.default(options));

//add your routes

//enable pre-flight
router.options("*", cors.default(options)) */


app.use(json());
app.use(bodyParser.urlencoded({
    extended: true
  }));
  
//console.log(process.env.DB_HOST);

const db = process.env.DB_HOST as string;
connect({ db });
app.use("/todos", todoRoutes);
app.use("/items", itemRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message })
});


app.listen(4000);