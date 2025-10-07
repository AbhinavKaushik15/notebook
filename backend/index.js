import connectToMongo from "./database/db.js";
import express from "express";
import auth from "./routes/auth.js";
import notes from "./routes/notes.js";
import cors from "cors";

const app = express();
const port = 5000;

connectToMongo();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.json("Notebook backend API");
});
app.use("/api/auth", auth);
app.use("/api/notes", notes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
