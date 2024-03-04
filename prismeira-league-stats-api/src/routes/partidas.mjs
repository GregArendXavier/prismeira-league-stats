import database from "../database/conection.mjs";
import { Router } from "express";

const SelectAll = Router();

async function Partidas(req, res) {
  const target = database
    .raw(
      `
    create table if not exists resultados_partidas (
      qtd_pontos_visitante integer,
      qtd_pontos_mandante integer,
      qtd_felinos_mandante integer,
      qtd_felinos_visitante integer,
      id_partida integer primary key,
      qtd_penalidades_mandante integer,
      qtd_penalidades_visitante integer,
      juiz varchar(300),
      vencedor varchar(300)
    )
`
    )
    .then((value) => database.raw(`SELECT * from resultados_partidas`))
    .then((value) => JSON.parse(JSON.stringify(value)))
    .catch((error) => console.log("Erro:", error));

  const data = await target;

  res.status(200).send(data);
}

SelectAll.get("/partidas", Partidas);

export default SelectAll;
