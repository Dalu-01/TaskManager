import express, { type Router, type Request, type Response } from "express";
import Task from "../models/task.js";
import { protect, type AuthRequest } from "../middlewares/auth.js";

const router: Router = express.Router();
router.use(protect);

router.get("/", async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await Task.find({userId: req.user?.id}).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user?.id,  
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const task = new Task({
      ...req.body,
      userId: req.user?.id
    });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: 'Bad request', error });
  }
});

router.put('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const updated = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user?.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updated) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Bad request', error });
  }
});

router.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user?.id
    });
    if (!deleted) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;