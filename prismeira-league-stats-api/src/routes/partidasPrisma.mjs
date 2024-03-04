import database from "../database/conection.mjs";
import { Router } from "express";

const SelectAllPrisma = Router();

async function PartidasPrisma(req, res) {
  database;

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
      juiz varchar(300)
  )
  `
    )
    .then((value) => database.raw(`SELECT * from resultados_partidas`))
    .then((value) => JSON.parse(JSON.stringify(value)))
    .catch((error) => console.log("Erro:", error));

  const data = await target;

  let cleanData = [];

  if (data) {
    data.map((partida) => {
      let primeiroNivel = {};

      let segundoNivel = {};

      let terceiroNivel = {};

      let quartoNivel = {};

      let quintoNivel = {};

      let sextoNivel = {};

      let setimoNivel = {};

      let ultimoNivel = {};

      primeiroNivel.juiz = partida.juiz;

      segundoNivel[partida.qtd_penalidades_visitante] = primeiroNivel;

      terceiroNivel[partida.qtd_penalidades_mandante] = segundoNivel;

      quartoNivel[partida.qtd_felinos_visitante] = terceiroNivel;

      quintoNivel[partida.qtd_felinos_mandante] = quartoNivel;

      sextoNivel[partida.qtd_pontos_mandante] = quintoNivel;

      setimoNivel[partida.qtd_pontos_visitante] = sextoNivel;

      ultimoNivel[partida.id_partida] = setimoNivel;

      return ultimoNivel;
    });
  }

  res.status(200).send(cleanData);
}

SelectAllPrisma.get("/partidasPrisma", PartidasPrisma);

export default SelectAllPrisma;
