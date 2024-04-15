
import { DataSource } from "typeorm";

const db = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  entities: ["pays", "continent"],
  synchronize: true,
});

export default db;
