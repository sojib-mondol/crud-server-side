const express = require("express");
const cors = require("cors");

const db = require("./utils/dbConnect");
const usersRoutes = require("./routes/v1/users.routes");

// const jwt = require('jsonwebtoken');;
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// Connect to the database
db.connect()
  .then(() => {})
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

//User routes
app.use("/api", usersRoutes);




app.get("/", async (req, res) => {
  res.send(`CRUD server is running at port : ${port}`);
});

app.all("*", async (req, res) => {
  res.send({ message: "Route Not Exists!" });
});

app.listen(port, () =>
  console.log(`CRUD server running on ${port}`)
);
