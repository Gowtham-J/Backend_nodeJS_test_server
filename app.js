var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// ---- Importing Auth middleware
const { checkToken } = require("./auth/auth");
// ---- Importing Routes
const signInRoute = require("./routes/SingIn/signIn");
const logInRoute = require("./routes/LogIn/login");
const deleteUsersRoute = require("./routes/DeleteUsers/deleteUsers");
const getUsers = require("./routes/Users/users");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

const db = require("./dbConnection");

var app = express();

require("dotenv").config();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// -------------------------Creating Custom Routes

// ------Creating SigIn Request Routes
app.use("/signIn", signInRoute);

// ------Creating LogIn Request Routes
app.use("/logIn", logInRoute);

// ------Creating Get Data Request Routes
app.use("/users", checkToken, getUsers);

// ------Creating Delete Request Routes
app.use("/delete/existing/usersData", checkToken, deleteUsersRoute);

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

// ------------------------- END of Creating Custom Routes

//---------------- Middleware for route Security
app.use(function (req, res, next) {
  res.send({ message: "Path not found" }, 404);
});
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
