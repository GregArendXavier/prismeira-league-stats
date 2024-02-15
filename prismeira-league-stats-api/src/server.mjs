import express from "express";
import cors from "cors";
import ROTAS from "./routes/upsert.mjs";
import Merge from "./routes/upsert.mjs";
import SelectAll from "./routes/partidas.mjs";
import SelectOne from "./routes/partida.mjs";

const app = express();

app.get("/", (req, res) => res.json({ message: "Wats up" }));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(ROTAS);

app.use(Merge);
app.use(SelectAll);
app.use(SelectOne);

app.listen(3002, () => console.log("Magic happens on port 3002"));
