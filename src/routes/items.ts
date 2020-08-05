import { Router } from "express";
import { createItem, getItems, updateItem, deleteItem } from "../controllers/items";
const router = Router();

router.route("/")
    .post(createItem)
    .get(getItems);

router.delete("/:id", deleteItem);

router
    .patch("/:id", updateItem)

export default router;