const express = require("express");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");

const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

const app = express();

// Returns middleware that only parses json
// built-in middleware
app.use(express.json());
app.use(express.static("./public"));

// custom middleware create
const LoggerMiddleware = (req, res, next) => {
  let loggedIn = false;
  console.log(
    `Logged  ${req.url}  ${req.method} -- ${new Date().toLocaleString()}`
  );
  if (loggedIn) {
    next();
  } else {
    next(new Error("login failure"));
  }
};

// application level middleware
// app.use(LoggerMiddleware);

// router level middleware
// app.use(["/cart", "/checkout"], LoggerMiddleware);

// error handler middleware
// app.use((err, req, res, next) => {
//   res.status(500).send(err);
// });

// users routes
app.use(["/users", "/user"], userRouter);
app.use(["/posts", "/post"], postRouter);

// connecting to mongoDB
mongoose.connect("mongodb://127.0.0.1:27017/appBlog", (err) => {
  if (!err) {
    console.log("DB Connected");
  }
  console.log(err);
});

app.listen(PORT, (err) => {
  if (!err)
    return console.log(`Express Server Starts at http://localhost:${PORT}`);
  console.log(err);
});
