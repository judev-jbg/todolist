import express from "express";
import {getTasks, addTask, editTask, deleteTask} from "../controllers/tasksController";

const router = express.Router();

router.get("/tasks", getTasks);
router.post("/task", addTask);
router.patch("/task/:id", editTask);
router.delete("/task/:id", deleteTask);

export default router;

