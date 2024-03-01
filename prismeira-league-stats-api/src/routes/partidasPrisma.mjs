import database from "../database/conection.mjs";
import { Router } from "express";

const SelectAllPrisma = Router();

async function PartidasPrisma(req, res) {
  const target = database
    .raw(`SELECT * from resultados_partidas`)
    .then((value) => JSON.parse(JSON.stringify(value)))
    .catch((error) => console.log("Erro:", error));

  const data = await target;

  const cleanData = {};

  data.map((partida) => (cleanData[partida.id_partida] = partida));

  res.status(200).send(cleanData);
}

SelectAllPrisma.get("/partidasPrisma", PartidasPrisma);

export default SelectAllPrisma;
