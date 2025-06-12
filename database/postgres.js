import { Sequelize } from "sequelize";
import { DB_URI } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    "Please define the DB_URI environment variable inside .env.<development/production>.local",
  );
}

export const sequelize = new Sequelize(DB_URI);

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to Postgres");
  } catch (error) {
    console.error("Failed to connect to Postgres: " + error.message);
    return process.exit(1);
  }

  return null;
};
