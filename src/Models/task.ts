import mongoose, { Document } from "mongoose";

export interface ITodo extends Document {
  title: string;
  description: string;
  status: boolean;
}

//Model of tasks
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model<ITodo>("Todo", todoSchema);
