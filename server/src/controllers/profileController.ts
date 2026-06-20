import { type Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { type AuthRequest } from "../middlewares/auth.js";

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { name, currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user?.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;

    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ message: "Current password is required" });
      }
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Current password is incorrect" });
      }
      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();

    res.status(200).json({
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
