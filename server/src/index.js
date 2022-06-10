const express = require("express");
const app = express();
const userRoute = require("./Routes/user");
const authRoute = require("./Routes/auth");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

app.use(cors());
const PORT = process.env.PORT || 8080;

const buildPath = path.normalize(path.join(__dirname, "../../client/build"));
app.use(express.static(buildPath));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((e) => console.log(e));

app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/auth/", authRoute);

app.get("(/*)?", async (req, res, next) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.listen(PORT, () => {
  console.log("Up and running on " + PORT);
});
