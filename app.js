const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user-routes");
const noteController = require("./routes/noteRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const { MONGO_URL,PORT } = process.env;
const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use("/api", router);
app.use('/api/notes', noteController);
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
