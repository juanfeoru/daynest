import { useReducer } from "react";
import { tasksReducer } from "../reducers/reducer";
import { tasksSeed } from "../data/seed";
import { TasksContext } from "./TasksContext";

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, dispatch] = useReducer(tasksReducer, tasksSeed);

  return (
    <TasksContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
}
