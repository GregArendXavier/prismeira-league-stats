import express from "express";
import cors from "cors";
import ROTAS from "./routes/upsert.mjs";

const app = express();

app.get("/", (req, res) => res.json({ message: "Wats up" }));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(ROTAS);

app.listen(3002, () => console.log("Magic happens on port 3002"));
