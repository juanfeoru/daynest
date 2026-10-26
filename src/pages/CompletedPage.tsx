import { useOutletContext } from 'react-router';
import TaskList from '../components/tasks/TaskList';
import type { Task } from '../types/types';

interface OutletContext {
  onEditTask: (task: Task) => void;
}

export default function CompletedPage() {
  const { onEditTask } = useOutletContext<OutletContext>();

  return (
    <div className="mx-auto w-full max-w-4xl">
      <TaskList
        title="Tareas completadas"
        description="Mira todo lo que has conseguido."
        filter="completed"
        onEditTask={onEditTask}
      />
    </div>
  );
}
