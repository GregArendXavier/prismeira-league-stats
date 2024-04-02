import express from "express";
import cors from "cors";
import Merge from "./routes/upsert.mjs";
import SelectAll from "./routes/partidas.mjs";
import SelectOne from "./routes/partida.mjs";
import SelectAllPrisma from "./routes/partidasPrisma.mjs";
import AJUSTES from "./routes/ajustes.mjs";
// import ERROS from "./routes/erro.mjs";

export const app = express();

app.use(cors());

app.get("/", (req, res) => res.json({ message: "Wats up" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(ROTAS);

app.use(Merge);
app.use(SelectAll);
app.use(SelectOne);
app.use(SelectAllPrisma);
app.use(AJUSTES);
// app.use(ERROS);

const server = app.listen(3002, () =>
  console.log("Iniciou na porta 3002 com pid: ", process.pid)
);

// app.use((err, req, res, next) => {
//   //   console.error(err.stack);
//   res.status(500).send("Algo deu errado!");
//   server.close(() => {
//     console.log("Servidor encerrado de forma elegante");
//     process.exit();
//   });
// });

// process.on("uncaughtException", (error, origin) => {
//   console.info("\nuncaughtException");
// });

// process.on("unhandledRejection", (error, origin) => {
//   console.info("\nunhandledRejection");
// });
