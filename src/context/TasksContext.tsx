import { createContext } from "react";
import type { Task } from "../types/types";
import type { TaskAction } from "../reducers/reducer";

type TasksContextValue = {
  tasks: Task[];
  dispatch: React.Dispatch<TaskAction>;
};

export const TasksContext = createContext<TasksContextValue | null>(null);
