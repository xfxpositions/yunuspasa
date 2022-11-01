import express from "express";
import mongoose from "mongoose";
const app = express();

import userView from "./views/userView.js";

const mongodbUri =
  "mongodb+srv://admin00:yusuf123@cluster0.norom.mongodb.net/yunusunmekan?retryWrites=true&w=majority";

app.use(express.json());

app.use(userView);

const port = 90;

mongoose.connect(mongodbUri, (err) => {
  if (err) throw err;
  else console.log("mongdb is connected");
  app.listen(port, () => {
    console.log(`app working on ${port} port!`);
  });
});
