import { useOutletContext } from "react-router";
import TaskList from "../components/tasks/TaskList";
import type { Task } from "../types/types";

interface OutletContext {
  onEditTask: (task: Task) => void;
}

export default function AllTasks() {
  const { onEditTask } = useOutletContext<OutletContext>();

  return (
    <div className="mx-auto w-full max-w-4xl">
      <TaskList
        title="Todas las tareas"
        description="Todo lo que tienes en marcha, en un solo lugar."
        filter="all"
        onEditTask={onEditTask}
      />
    </div>
  );
}
