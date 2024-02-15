import database from "../database/conection.mjs";
import { Router } from "express";

const SelectOne = Router();

async function Partida(req, res) {
  const target = database
    .raw(
      `SELECT * from resultados_partidas where id_partida = ${req.params.id}`
    )
    .then((value) => JSON.parse(JSON.stringify(value)))
    .catch((error) => console.log("Erro:", error));

  const data = await target;

  res.status(200).send(data);
}

SelectOne.get("/partida/:id", Partida);

export default SelectOne;
