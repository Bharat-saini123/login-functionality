import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import ConnectionFunction from "../connection/connection.js";
import authRoutes from "../routes/userRoutes.js";
const port = process.env.PORT || 5000;
const corsOptions = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,get,head,put,patch,post,delete",
  credentials: true,
};
const App = express();

App.use(express.json());
App.use(cors(corsOptions));
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false }));
App.use(cookieParser());
App.use("/api/auth", authRoutes);
ConnectionFunction();
App.listen(port, () => {
  console.log(`server start at the port of ${port}`);
});
