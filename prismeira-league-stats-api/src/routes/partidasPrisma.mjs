import database from "../database/conection.mjs";
import { Router } from "express";

const SelectAllPrisma = Router();

async function PartidasPrisma(req, res) {
  const target = database
    .raw(`SELECT * from resultados_partidas`)
    .then((value) => JSON.parse(JSON.stringify(value)))
    .catch((error) => console.log("Erro:", error));

  const data = await target;

  let cleanData = data.map((partida) => {
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

  res.status(200).send(cleanData);
}

SelectAllPrisma.get("/partidasPrisma", PartidasPrisma);

export default SelectAllPrisma;
