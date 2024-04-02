import cluster from "cluster";
import dotenv from "dotenv";

const runPrimaryProcess = () => {
  dotenv.config();
  const NODES = parseInt(process.env.NODES);

  // console.log(`Primary ${process.pid} is running`);
  // console.log(`Forking Server with ${NODES} processes\n`);

  for (let index = 0; index < NODES; index++) cluster.fork();

  cluster.on("exit", (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      // console.log(`Worker ${worker.process.pid} died`);
      cluster.fork();
    }
  });
};

const runWorkerProcess = async () => {
  await import("./server.mjs");
};

cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess();
