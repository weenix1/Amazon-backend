import { Router } from "express";

import productsHandler from "./handlers.js";

const router = Router();

router.get("/", productsHandler.getAll);

router.post("/", productsHandler.createUser);

router
  .route("/:id")
  .get(productsHandler.getById)
  .put(productsHandler.updateUserById)
  .delete(productsHandler.deleteUserById);

export default router;
