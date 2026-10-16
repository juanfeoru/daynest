import { useOutletContext, useParams } from "react-router";
import TaskList from "../components/tasks/TaskList";
import { useLists } from "../hooks/useLists";
import type { Task } from "../types/types";

interface LayoutContext {
  onEditTask: (task: Task) => void;
}

export default function ListPage() {
  const { listId } = useParams<{ listId: string }>();
  const { lists } = useLists();
  const { onEditTask } = useOutletContext<LayoutContext>();

  const list = lists.find((item) => item.id === listId);

  if (!list) {
    return (
      <section className="py-8">
        <h2 className="text-xl font-semibold text-text-primary">
          Lista no encontrada
        </h2>
        <p className="mt-2 text-sm text-text-secondary">
          Esta lista no existe o ha sido eliminada.
        </p>
      </section>
    );
  }

  return (
    <div className="w-full min-w-0">
      <header className="mb-8 flex items-center gap-3">
        <span
          aria-hidden="true"
          className="size-4 shrink-0 rounded-full"
          style={{ backgroundColor: list.color }}
        />

        <h2 className="text-2xl font-bold tracking-tight text-text-primary">
          {list.name}
        </h2>
      </header>

      <TaskList
        title="Tareas pendientes"
        description={`Tareas de tu lista ${list.name}`}
        filter="list"
        listId={list.id}
        onEditTask={onEditTask}
      />
    </div>
  );
}
