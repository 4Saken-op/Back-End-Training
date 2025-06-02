import express from "express";
import employeeRouter from "./routes/employee.route";
import authRouter from "./routes/auth.route";
import loggerMiddleware from "./middlewares/loggerMiddleware";
import datasource from "./db/data-source";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { authMiddleware } from "./middlewares/authMiddleware";
import { LoggerService } from "./services/logger.service";
import deptRouter from "./routes/dept.route";
import cors from "cors";

// const { Client } = require('pg');

const server = express();
server.use(cors());
server.use(express.json());
server.use(loggerMiddleware);
const logger = LoggerService.getInstance("app()");

server.use("/employee", employeeRouter); //authMiddleware
server.use("/auth", authRouter);
server.use("/dept", deptRouter);
server.use(errorMiddleware);

server.get("/", (req, res) => {
  logger.info(req.url);
  res.status(200).send("Main Server");
});

(async () => {
  try {
    await datasource.initialize();
    logger.info("Connected to Database");
  } catch {
    logger.error("Failed to connect to DB");
    process.exit(1);
  }

  server.listen(3000, () => {
    logger.info("Server listening to 3000");
  });
})();

// Database connection configuration
const dbConfig = {
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: "5432",
  database: "training",
};

// const client = new Client(dbConfig);

// client.connect()
//   .then(() => {
//     client.query('SELECT * FROM employee', (err, result) => {
//       if (!err) {
//         console.log('Query result:', result.rows);
//       }
//       client.end();
//     });
//   })
//   .catch((err) => {});

// server.listen(3000, () => {
//   console.log("server listening to 3000");
// });
