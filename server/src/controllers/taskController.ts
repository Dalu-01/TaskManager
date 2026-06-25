import { type Response } from "express";
import Task from "../models/task.js";
import { type AuthRequest } from "../middlewares/auth.js";

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await Task.find({
      userId: req.user!.id,
      deleted: false,
    }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch tasks" });
  }
};

export const getTaskById = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user?.id,
      deleted: false,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getTrashTasks = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await Task.find({
      userId: req.user!.id,
      deleted: true,
    }).sort({ deletedAt: -1 });
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch trashed tasks" });
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = new Task({
      ...req.body,
      userId: req.user!.id,
      deleted: false,
    });
    const savedTask = await task.save();
    res.status(201).json({ success: true, task: savedTask });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to create task" });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user!.id, deleted: false },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    res
      .status(200)
      .json({ success: true, task: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update task" });
  }
};

export const restoreTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user?.id, deleted: true },
      { deleted: false, deletedAt: null },
      { new: true },
    );
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found in trash" });
    }
    res
      .status(200)
      .json({ success: true, message: "Task restored successfully", task });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to restore task", error });
  }
};

export const permanentDeleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user?.id,
      deleted: true,
    });
    if (!task)
      return res.status(404).json({ message: "Task not found in trash" });
    res.status(200).json({ message: "Task permanently deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to permanently delete task", error });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user!.id, deleted: false },
      { deleted: true, deletedAt: new Date() },
      { new: true },
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task moved to trash successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const emptyTrash = async (req: AuthRequest, res: Response) => {
  try {
    await Task.deleteMany({
      userId: req.user!.id,
      deleted: true,
    });
    res.status(200).json({ success: true, message: "Trash emptied successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to empty trash" });
  }
};