import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import db from "./db.js";
import prophancerModel from "./propmodel.js";

dotenv.config()
const port = process.env.API_PORT || 5050

const app = express();

// db synchronization
// (async () => {
//   try {
//     await db.authenticate();
//     console.log('Connection has been established successfully.');
//     await db.sync();
//     console.log('Database synchronized.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// })();

app.use(cors());
app.use(express.json());


// delete by id
app.delete("/delete_schedule/:id", async (req, res) => {
  try {
    await prophancerModel.destroy({
      where: {
        propcode: req.params.id,
      },
    });
    res.status(200).json({ msg: "Data berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// get all
app.get("/get_schedule", async (req, res) => {
  const data = await prophancerModel.findAll({
    attributes: ["propcode", "propname", "proptime", "propvalue"],
  });
  try {
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// post data
app.post("/post_schedule", async (req, res) => {
  const { code, name, time, value } = req.body;
  try {
    const data = await prophancerModel.create({
      propcode: code,
      propname: name,
      proptime: time,
      propvalue: parseInt(value),
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});


app.listen(port, () => {
  console.log(`app running in localhost:${port}`);
});