import { CircleCheck } from "lucide-react";
import TaskItem from "./TaskItem";
import type { TaskGroup } from "../../data/seed";
import { useTasks } from "../../hooks/useTasks";
import {
  formatTaskGroupDate,
  getTodayDate,
  getTomorrowDate,
} from "../../utils/date";
import type { Task } from "../../types/types";

type TaskFilter = "today" | "upcoming" | "all";

interface TaskListProps {
  title?: string;
  description?: string;
  empty?: boolean;
  filter: TaskFilter;
  onEditTask: (task: Task) => void;
}

export default function TaskList({
  title,
  description,
  empty = false,
  filter,
  onEditTask,
}: TaskListProps) {
  const { tasks, dispatch } = useTasks();

  const today = getTodayDate();

  const visibleTasks = tasks.filter((task) => {
    if (task.completed) return false;

    if (filter === "today") {
      return task.date === today;
    }

    if (filter === "upcoming") {
      return task.date > today;
    }

    return true;
  });

  const groups: TaskGroup[] =
    filter === "upcoming"
      ? [...new Set(visibleTasks.map((task) => task.date))]
          .sort()
          .map((date) => ({
            title:
              date === getTomorrowDate() ? "Mañana" : formatTaskGroupDate(date),
            tasks: visibleTasks.filter((task) => task.date === date),
          }))
      : filter === "today"
        ? [{ title: "Hoy", tasks: visibleTasks }]
        : [
            {
              title: "Hoy",
              tasks: visibleTasks.filter((task) => task.date === today),
            },
            {
              title: "Próximas",
              tasks: visibleTasks.filter((task) => task.date > today),
            },
          ];

  const totalTasks = groups.reduce(
    (total, group) => total + group.tasks.length,
    0,
  );

  function handleDeleteTask(id: string) {
    dispatch({
      type: "DELETE_TASK",
      payload: { id },
    });
  }

  if (empty || totalTasks === 0) {
    return (
      <section className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-border px-6 py-12 text-center">
        <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-sage-light text-primary">
          <CircleCheck size={24} />
        </div>

        <h3 className="text-base font-semibold text-text-primary">
          Todo en orden
        </h3>

        <p className="mt-2 max-w-xs text-sm leading-6 text-text-secondary">
          No tienes tareas pendientes aquí. Disfruta del espacio libre o añade
          una nueva tareas.
        </p>
      </section>
    );
  }

  return (
    <section className="w-full min-w-0">
      <header className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold tracking-tight text-text-primary">
            {title}
          </h2>

          <p className="mt-1 text-sm text-text-secondary">{description}</p>
        </div>

        <span className="shrink-0 rounded-lg bg-sage-light px-2.5 py-1.5 text-xs font-medium text-[#496348]">
          {totalTasks} {totalTasks === 1 ? "tarea" : "tareas"}
        </span>
      </header>

      <div className="space-y-6">
        {groups.map((group) => (
          <section key={group.title}>
            <div className="mb-3 flex items-center gap-3">
              <span
                className="size-2 shrink-0 rounded-full bg-primary"
                aria-hidden="true"
              />

              <h3 className="text-sm font-semibold text-text-primary">
                {group.title}
              </h3>

              <span className="text-xs text-text-secondary">
                {group.tasks.length}
              </span>

              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="flex flex-col gap-2">
              {group.tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  priority={task.priority}
                  date={task.date}
                  time={task.time}
                  completed={task.completed}
                  onToggle={(id) =>
                    dispatch({
                      type: "TOGGLE_TASK",
                      payload: { id },
                    })
                  }
                  onEdit={() => onEditTask(task)}
                  onDelete={() => handleDeleteTask(task.id)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
