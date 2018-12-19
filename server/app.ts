import { json, urlencoded } from "body-parser";
import * as compression from "compression";
import * as express from "express";
import * as http from "http";
import * as path from "path";

import {config} from "../.configenv";
import { layerRouter } from "./routes/layers";
import {loginRouter} from "./routes/login";
import { reportRouter } from "./routes/report";
import {supportGazaStripRouter} from "./routes/support_gaza_strip";
import {userRouter} from "./routes/user";

const alonAPI = require("./routes/alon");

const util = require("util");
const https = require("https");
const url = require("url");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const cors = require("cors");
const app: express.Application = express();

app.disable("x-powered-by");

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
app.use(cors());

// Add headers - enable cors
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use((req, res, next) => {
  // let secretToken;
  //
  // const url = req.url.toLowerCase();
  //
  // // check header or url parameters or post parameters for token
  // const token = req.body.token || req.query.token || req.headers["x-access-token"];
  //
  // // decode token
  // if (token) {
  //   // verifies secret and checks exp
  //   if (process.env.NODE_ENV !== "production") {
  //     secretToken = config.secretToken[1];
  //   } else {
  //     secretToken = config.secretToken[0];
  //   }
  //   jwt.verify(token, secretToken, (err, decoded) => {
  //     if (err) {
  //       return res.json({success: false, message: "Failed to authenticate token."});
  //     } else {
  //       // if everything is good, save to request for use in other routes
  //       req["decoded"] = decoded;
  //       next();
  //     }
  //   });
  // } else if (
  //   url == "/api/login/signup" ) {
    next();
  // } else {
  //   // if there is no token
  //   // return an error
  //   console.log(url);
  //   return res.status(403).send({
  //     success: false,
  //     message: "No token provided.",
  //   });
  // }
});

app.use("/api/token", alonAPI.router);
app.use("/api/users", userRouter);
app.use("/api/report", reportRouter);
app.use("/api/layers", layerRouter);
app.use("/api/login", loginRouter);
app.use("/api/supportcitizens", supportGazaStripRouter);

const polygonFilter = require("./utils/polygonFilter");
console.log("started");

// if (app.get("env") === "production") {
  // in production mode run application from dist folder

  // PRODUCTION MODE
app.use(express.static(path.join(__dirname, "/../client")));
// }

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next) => {
  const err = new Error("Not Found");
  next(err);
});

// production error handler
// no stacktrace leaked to user
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {

  res.status(err.status || 500);
  res.json({
    error: {},
    message: err.message,
  });
});

export { app };
