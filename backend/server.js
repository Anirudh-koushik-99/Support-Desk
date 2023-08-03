const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const path = require("path");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

//CONNECT TO DATABASE
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//ROUTES
app.use("/api/users", require("./routes/userRouter"));
app.use("/api/tickets", require("./routes/ticketRoutes"));


if (process.env.NODE_ENV === "production") {
  //set static folder
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  //any route that is not api will be redirected to index.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the Support Desk API" });
  });
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
