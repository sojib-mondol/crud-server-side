// all imports here...
const express = require("express");
const db = require("../../utils/dbConnect");
const { ObjectId } = require("mongodb");

//initialize express router
const router = express.Router();

// get api
router.get("/users", async (req, res) => {
  try {
    const client = db.getClient(); // Use the existing database client
    const users = client.db("demoCrudAppTask").collection("users");
    const result = await users.find().toArray();
    res.send(result);
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
