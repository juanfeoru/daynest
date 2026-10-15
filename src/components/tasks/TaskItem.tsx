import { Calendar, Check, Ellipsis, Pencil, Timer, Trash2 } from "lucide-react";
import { useState } from "react";

type Priority = "baja" | "media" | "alta";

interface TaskItemProps {
  id: string;
  title: string;
  description?: string;
  priority?: Priority;
  date?: string;
  time?: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onEdit: () => void;
  onDelete: (id: string) => void;
}

const priorityStyles: Record<Priority, string> = {
  baja: "bg-sage-light text-[#496348]",
  media: "bg-butter text-[#66562B]",
  alta: "bg-[#F7E5DE] text-[#815747]",
};

export default function TaskItem({
  id,
  title,
  description,
  priority = "media",
  date,
  time,
  completed,
  onToggle,
  onEdit,
  onDelete,
}: TaskItemProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <article
      className={`group flex items-start gap-3 rounded-xl border bg-surface p-4 transition-colors duration-150
        ${
          completed
            ? "border-border/70"
            : "border-border hover:border-primary/40"
        }
      `}
    >
      <button
        type="button"
        aria-label={completed ? "Marcar como pendiente" : "Completar tarea"}
        aria-pressed={completed}
        onClick={() => onToggle(id)}
        className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-[1.5px] transition-colors
    ${
      completed
        ? "border-primary bg-primary text-white"
        : "border-[#B8C2B2] bg-surface hover:border-primary"
    }
  `}
      >
        {completed && <Check size={12} />}
      </button>
      <div className="min-w-0 flex-1">
        <h3
          className={`
           wrap-break-word text-sm font-medium leading-5
            ${
              completed
                ? "text-text-secondary line-through"
                : "text-text-primary"
            }
          `}
        >
          {title}
        </h3>

        {description && (
          <p className="mt-1 wrap-break-word text-sm leading-5 text-text-secondary">
            {description}
          </p>
        )}

        <div
          className={`mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 ${
            completed ? "opacity-60" : ""
          }`}
        >
          {priority && (
            <span
              className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${priorityStyles[priority]}`}
            >
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </span>
          )}

          {date && (
            <span className="inline-flex items-center gap-1.5 text-xs text-text-secondary">
              <Calendar size={14} />
              {date}
            </span>
          )}

          {time && (
            <span className="inline-flex items-center gap-1.5 text-xs text-text-secondary">
              <Timer size={14} />
              {time}
            </span>
          )}
        </div>
      </div>

      <div className="relative shrink-0">
        <button
          type="button"
          aria-label="Más opciones"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex size-8 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-background hover:text-text-primary"
        >
          <Ellipsis size={16} />
        </button>

        {menuOpen && (
          <div
            role="menu"
            className="absolute right-0 top-full z-20 mt-1 w-44 rounded-xl border border-border bg-surface p-1.5 shadow-lg"
          >
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setMenuOpen(false);
                onEdit();
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-text-primary transition-colors hover:bg-background"
            >
              <Pencil size={15} />
              Editar tarea
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setMenuOpen(false);
                onDelete(id);
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-red-500 transition-colors hover:bg-red-500/10"
            >
              <Trash2 size={15} />
              Eliminar tarea
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
