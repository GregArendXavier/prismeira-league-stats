import knex from "knex";

const database = knex({
  client: "sqlite3",
  connection: {
    filename: "./src/data.db",
  },
  useNullAsDefault: true,
});

export default database;
