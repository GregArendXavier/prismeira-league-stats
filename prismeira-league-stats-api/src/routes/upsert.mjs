import database from "../database/conection.mjs";
import { Router } from "express";

const Merge = Router();

async function Upsert(req, res) {
  const {
    pontosVisitante,
    pontosMandante,
    felinosMandante,
    felinosVisitante,
    penalidadesMandante,
    penalidadesVisitante,
    juiz,
    idPartida,
    vencedor,
  } = req.body;

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
    .then(
      (value) =>
        database("resultados_partidas")
          .insert({
            qtd_pontos_visitante: pontosVisitante,
            qtd_pontos_mandante: pontosMandante,
            qtd_felinos_mandante: felinosMandante,
            qtd_felinos_visitante: felinosVisitante,
            qtd_penalidades_mandante: penalidadesMandante,
            qtd_penalidades_visitante: penalidadesVisitante,
            juiz: juiz,
            vencedor: vencedor,
            id_partida: idPartida,
          })
          .onConflict("id_partida")
          .merge()
      // .then((value) => database.raw(`SELECT * from resultados_partidas`))
      // .then((results) => {
      //   return results;
      // })
    )
    .catch((error) => console.log(error));

  const dataCLean = await target;

  res.status(200).send(dataCLean);
}

Merge.post("/upsert", Upsert);

export default Merge;
