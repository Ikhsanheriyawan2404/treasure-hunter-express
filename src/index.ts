import "reflect-metadata";
import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";

// import connection from "./config/connection";

dotenv.config();

const app: Express = express();
const port: string = process.env.PORT ?? "3000";
  
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

const start = async (): Promise<void> => {
  try {
    // await connection.sync();
    app.listen(port, () => {
      console.log(`Server started on ${process.env.HOST} ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
  
void start();