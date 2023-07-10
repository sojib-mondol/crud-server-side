// all imports here...
const express = require("express");
const db = require("../../utils/dbConnect");
const { ObjectId } = require("mongodb");

//initialize express router
const router = express.Router();

// post api
router.post("/user", async (req, res) => {
  try {
    const client = db.getClient(); // Use the existing database client
    const users = client.db("demoCrudAppTask").collection("users");
    const user = req.body;
    const result = await users.insertOne(user);
    res.send(result);
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});

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

// update the user
router.put("/update/:id", async (req, res) => {
  try {
    const client = db.getClient(); // Use the existing database client
    const users = client.db("demoCrudAppTask").collection("users");
    const id = req.params.id;
    const addUser = req.body;
    const fields = Object.keys(addUser);
    const existField = fields.filter(each => addUser[each]);
    let updateValue = {}
    existField.forEach(each => {
      updateValue[each] = addUser[each]
    })
    
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateDoc = {
      $set: updateValue,
    };
    const result = await users.updateOne(filter, updateDoc, options);
    res.send(result);
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});

// get data by id
router.get("/user/:id", async (req, res) => {
  try {
    const client = db.getClient(); // Use the existing database client
    const users = client.db("demoCrudAppTask").collection("users");

    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await users.findOne(query);

    res.send(result);
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});

// delete a user
router.delete("/user/:id", async (req, res) => {
  try {
    const client = db.getClient(); // Use the existing database client
    const users = client.db("demoCrudAppTask").collection("users");

    const id = req.params.id;
    // console.log(id);
    const query = { _id: new ObjectId(id) };
    const result = await users.deleteOne(query);
    res.send(result);
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
