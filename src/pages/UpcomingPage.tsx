import { useOutletContext } from "react-router";
import TaskList from "../components/tasks/TaskList";
import type { Task } from "../types/types";

interface OutletContext {
  onEditTask: (task: Task) => void;
}

export default function UpcomingPage() {
  const { onEditTask } = useOutletContext<OutletContext>();

  return (
    <div className="mx-auto w-full max-w-4xl">
      <TaskList
        title="Próximas tareas"
        description="Organiza lo que viene después."
        filter="upcoming"
        onEditTask={onEditTask}
      />
    </div>
  );
}
