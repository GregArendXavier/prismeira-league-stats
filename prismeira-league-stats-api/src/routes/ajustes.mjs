import database from "../database/conection.mjs";
import { Router } from "express";
import dotenv from "dotenv";

const AJUSTES = Router();

async function ajuste(req, res) {
  dotenv.config();
  const { query, secret } = req.body;

  if (secret === process.env.SECRET) {
    const target = database
      .raw(query)
      .then((value) => res.status(200).send("Executado com sucesso"))
      .catch((error) => res.status(400).send(`Erro: ${error}`));
  } else {
    res.status(500).send();
  }
}

AJUSTES.post("/ajustes", ajuste);

export default AJUSTES;
