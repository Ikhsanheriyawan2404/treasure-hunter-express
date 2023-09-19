import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbPass = process.env.DB_PASS;

const connection = new Sequelize(dbName, dbUser, dbPass,{
  dialect: "postgres",
  host: process.env.DB_HOST,
});

export default connection;
