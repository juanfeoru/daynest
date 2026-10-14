import { useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import type { Task } from "../../types/types";
import { getTodayDate } from "../../utils/date";

interface TaskFormProps {
  onClose: () => void;
}

type Priority = Task["priority"];

export default function TaskForm({ onClose }: TaskFormProps) {
  const { dispatch } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(() => getTodayDate());
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState<Priority>("media");
  const [error, setError] = useState({
    title: "",
    date: "",
  });

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    const nextErrors = {
      title: trimmedTitle ? "" : "Escribe un título para la tarea.",
      date: date ? "" : "Selecciona una fecha.",
    };

    setError(nextErrors);

    if (nextErrors.title || nextErrors.date) {
      return;
    }

    const now = new Date().toISOString();

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: trimmedTitle,
      description: description.trim() || undefined,
      date,
      time: time || undefined,
      priority,
      listId: "inbox",
      completed: false,
      createdAt: now,
      updatedAt: now,
    };

    dispatch({
      type: "ADD_TASK",
      payload: newTask,
    });

    onClose();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5 ">
      <div>
        <label
          htmlFor="task-title"
          className="mb-1.5 block text-sm font-medium text-text-primary"
        >
          Título <span aria-hidden="true">*</span>
        </label>

        <input
          id="task-title"
          name="title"
          type="text"
          autoFocus
          maxLength={120}
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setError((prev) => ({
              ...prev,
              title: "",
            }));
          }}
          placeholder="¿Qué necesitas hacer?"
          className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
        />

        {error.title && (
          <p role="alert" className="mt-1 text-sm text-red-400">
            {error.title}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="task-description"
          className="mb-1.5 block text-sm font-medium text-text-primary"
        >
          Descripción{" "}
          <span className="font-normal text-text-secondary">(opcional)</span>
        </label>

        <textarea
          id="task-description"
          name="description"
          rows={3}
          maxLength={500}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Añade algún detalle..."
          className="w-full resize-y rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="task-date"
            className="mb-1.5 block text-sm font-medium text-text-primary"
          >
            Fecha <span aria-hidden="true">*</span>
          </label>

          <input
            id="task-date"
            name="date"
            type="date"
            value={date}
            onChange={(event) => {
              setDate(event.target.value);
              setError((prev) => ({
                ...prev,
                date: "",
              }));
            }}
            className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
          />

          {error.date && (
            <p role="alert" className="mt-1 text-sm text-red-400">
              {error.date}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="task-time"
            className="mb-1.5 block text-sm font-medium text-text-primary"
          >
            Hora{" "}
            <span className="font-normal text-text-secondary">(opcional)</span>
          </label>

          <input
            id="task-time"
            name="time"
            type="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
        </div>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-text-primary">
          Prioridad
        </legend>

        <div className="grid grid-cols-3 gap-2">
          {(["baja", "media", "alta"] as const).map((option) => (
            <label
              key={option}
              className={`flex cursor-pointer items-center justify-center rounded-xl border px-3 py-2.5 text-sm font-medium capitalize transition ${
                priority === option
                  ? "border-primary bg-sage-light text-primary"
                  : "border-border bg-background text-text-secondary hover:border-primary/40"
              }`}
            >
              <input
                type="radio"
                name="priority"
                value={option}
                checked={priority === option}
                onChange={() => setPriority(option)}
                className="sr-only"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex justify-end gap-3 border-t border-border pt-4">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-text-secondary transition hover:bg-background"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Crear tarea
        </button>
      </div>
    </form>
  );
}
