import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  dueDate: Date;
  category: "Urgent" | "Important";
  userId: mongoose.Types.ObjectId;
  completed: boolean;
}

const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    dueDate: { type: Date, required: true },
    category: {
      type: String,
      enum: ["Urgent", "Important"],
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    completed: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model<ITask>("Task", TaskSchema);
