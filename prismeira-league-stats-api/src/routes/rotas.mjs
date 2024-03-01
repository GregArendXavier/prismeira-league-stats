import { Partidas } from "./partidas.mjs";
import { PartidasPrisma } from "./partidasPrisma.mjs";
import { Upsert } from "./upsert.mjs";

const ROTAS = Router();

ROTAS.post("/upsert", Upsert);

ROTAS.get("/partidas", Partidas);

ROTAS.get("/partidas/:id", Partidas);

ROTAS.get("/partidasPrisma", PartidasPrisma);

export default ROTAS;
