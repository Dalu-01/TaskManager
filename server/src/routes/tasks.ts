import express, { type Router } from "express";
import { protect } from "../middlewares/auth.js";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTrashTasks,
  restoreTask,
  permanentDeleteTask,
  emptyTrash,
} from "../controllers/taskController.js";

const router: Router = express.Router();
router.use(protect);

router.get("/", getTasks);
router.get("/trash", getTrashTasks);
router.patch("/trash/:id/restore", restoreTask);
router.delete("/trash/:id", permanentDeleteTask);
router.delete("/trash", emptyTrash);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;