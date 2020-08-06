import { Router } from "express";
import { createItem, getItems, updateItem, deleteItem,deleteItems } from "../controllers/items";
const router = Router();

router.route("/")
    .post(createItem)
    .get(getItems)
    .delete(deleteItems);

router.delete("/:id", deleteItem);

router
    .patch("/:id", updateItem)

export default router;