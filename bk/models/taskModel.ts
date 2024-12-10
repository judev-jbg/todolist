import mongoose, { Schema, Document } from "mongoose";

interface ITask extends Document {
  text: string;
  createdAt: Date;
}

const TaskSchema: Schema = new Schema(
  {
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITask>("Task", TaskSchema);