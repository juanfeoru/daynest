import { useEffect, useReducer } from 'react';
import { tasksReducer } from '../reducers/reducer';
import { tasksSeed } from '../data/seed';
import { TasksContext } from './TasksContext';
import type { Task } from '../types/types';

function loadTasks(): Task[] {
  try {
    const storedTasks = localStorage.getItem('daynest-tasks');

    if (storedTasks === null) return tasksSeed;

    return JSON.parse(storedTasks) as Task[];
  } catch {
    return tasksSeed;
  }
}

function saveTasks(tasks: Task[]) {
  try {
    localStorage.setItem('daynest-tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Error al guardar las tareas:', error);
  }
}

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, dispatch] = useReducer(tasksReducer, undefined, loadTasks);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  return (
    <TasksContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
}
