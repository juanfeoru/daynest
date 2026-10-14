import { useEffect } from "react";
import { X } from "lucide-react";
import TaskForm from "./TaskForm";

interface TaskFormModalProps {
  onClose: () => void;
}

export default function TaskFormModal({ onClose }: TaskFormModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/40 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
        className="mx-auto my-4 w-full max-w-lg rounded-2xl border border-border bg-surface p-5 shadow-xl sm:my-8 sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="task-modal-title"
              className="text-xl font-bold text-text-primary"
            >
              Nueva tarea
            </h2>

            <p className="mt-1 text-sm text-text-secondary">
              Organiza tu próximo paso.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana"
            className="flex size-9 items-center justify-center rounded-lg text-text-secondary hover:bg-background"
          >
            <X size={18} />
          </button>
        </div>

        <TaskForm onClose={onClose} />
      </section>
    </div>
  );
}
