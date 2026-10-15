import { useOutletContext } from "react-router";
import TaskList from "../components/tasks/TaskList";
import type { Task } from "../types/types";

interface OutletContext {
  onEditTask: (task: Task) => void;
}

export default function MyDayPage() {
  const { onEditTask } = useOutletContext<OutletContext>();

  return (
    <div className="mx-auto w-full max-w-4xl">
      <TaskList
        title="Mis tareas"
        description="Un paso a la vez, sin prisas."
        onEditTask={onEditTask}
      />
    </div>
  );
}
