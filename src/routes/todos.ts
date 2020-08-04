import { Router } from "express";
import { createTodo, getTodos, updateTodo, deleteTodo } from "../controllers/todos";
const router = Router();

router.route("/")
    .post(createTodo)
    .get(getTodos);

router.delete("/:id", deleteTodo);

router
    .patch("/:id", updateTodo)

export default router;