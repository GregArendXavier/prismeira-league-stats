import database from "../database/conection.mjs";
import { Router } from "express";

const SelectAll = Router();

async function Partidas(req, res) {
  const target = database
    .raw(`SELECT * from resultados_partidas`)
    .then((value) => JSON.parse(JSON.stringify(value)))
    .catch((error) => console.log("Erro:", error));

  const data = await target;

  res.status(200).send(data);
}

SelectAll.get("/partidas", Partidas);

export default SelectAll;
