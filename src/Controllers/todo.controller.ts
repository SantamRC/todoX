import { Request, Response } from "express";
import Todo, { ITodo } from "../Models/task";

//API for getting all tasks
export const getTodos = async (req: Request, res: Response): Promise<void> => {
  const limit: number = parseInt(req.query.limit as string) || 10;
  const page: number = parseInt(req.query.page as string) || 1;

  const skip: number = (page - 1) * limit;

  try {
    const count: number = await Todo.countDocuments();
    const todos = await Todo.find().skip(skip).limit(limit);

    res.status(200).json({
      todos,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalItems: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//API for Adding New Task
export const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<ITodo, "title" | "description" | "status">;

    const todo: ITodo = new Todo({
      title: body.title,
      description: body.description,
      status: body.status,
    });

    const newTodo: ITodo = await todo.save();
    const allTodos: ITodo[] = await Todo.find();

    res.status(201).json({
      message: "Todo added",
      todo: newTodo,
      todos: allTodos,
    });
  } catch (error) {
    throw error;
  }
};

//API for updating the tasks
export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;

    const updatedTodo: ITodo | null = await Todo.findByIdAndUpdate(
      { _id: id },
      body,
      { new: true }
    );

    const allTodos: ITodo[] = await Todo.find();

    res.status(200).json({
      message: "Todo updated",
      todo: updatedTodo,
      todos: allTodos,
    });
  } catch (error) {
    throw error;
  }
};

//API for deleting tasks
export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      params: { id },
    } = req;

    const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(id);
    const allTodos: ITodo[] = await Todo.find();

    res.status(200).json({
      message: "Todo deleted",
      todo: deletedTodo,
      todos: allTodos,
    });
  } catch (error) {
    throw error;
  }
};
