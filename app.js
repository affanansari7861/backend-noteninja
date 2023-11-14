// NPM IMPORTS
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

// * LOCAL IMPORTS
const connectDB = require("./db/connect");
const userRouter = require("./routes/user");
const uploadsRouter = require("./routes/uploads");
const notesRouter = require("./routes/notes");

//* MIDDLEWARE IMPORTS
const notFound = require("./middlewares/not-found");
const errorHandler = require("./middlewares/error-handler");

const app = express();
const server = require("http").createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));
app.use(cors());
app.use(express.static("./public"));

// routes
app.use("/user", userRouter);
app.use("/uploads", uploadsRouter);
app.use("/notes", notesRouter);
app.use(errorHandler);
app.use(notFound);
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(port, console.log(`server is listening at port ${port} ...`));
  } catch (error) {
    console.log(error);
  }
};

start();
