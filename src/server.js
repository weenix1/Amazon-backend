import express from "express";
import cors from "cors";
import createDefaultTables from "./db/create-tables.js";

import listEndpoints from "express-list-endpoints";
import {
  genericErrorHandler,
  badRequestHandler,
  unauthorizedHandler,
  notFoundHandler,
} from "./errorHandlers.js";
import productsRoute from "./services/products/productRoutes.js";

const server = express();

const { PORT } = process.env;

/* const whiteList = ["http://localhost:3010"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.some((allowedUrl) => allowedUrl === origin)) {
      callback(null, true);
    } else {
      const error = new Error("Not allowed by cors!");
      error.status = 403;
      callback(error);
    }
  },
}; */

server.use(cors());

server.use(express.json());
server.use("/products", productsRoute);

server.use(badRequestHandler);
server.use(unauthorizedHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

console.log(listEndpoints(server));

server.listen(PORT, async () => {
  console.log(`✅ Server is running on port ${PORT}`);
  await createDefaultTables();
});

server.on("error", (error) =>
  console.log(`❌ Server is not running due to : ${error}`)
);
