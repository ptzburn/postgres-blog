import { Sequelize } from "sequelize";
import { DB_URI } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    "Please define the DB_URI environment variable inside .env.<development/production>.local",
  );
}

const sequelize = new Sequelize(DB_URI);

export default sequelize;
