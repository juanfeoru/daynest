import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { CustomList } from "../../types/types";
import { useLists } from "../../hooks/useLists";

interface ListFormModalProps {
  onClose: () => void;
  listToEdit: CustomList | undefined;
}

const colors = [
  "#E9BBA8",
  "#A8B9D3",
  "#F0DFA7",
  "#B8CDB5",
  "#D0B8DB",
  "#E6A5AD",
];

export default function ListFormModal({
  onClose,
  listToEdit,
}: ListFormModalProps) {
  const { dispatchLists } = useLists();

  const [name, setName] = useState(listToEdit?.name ?? "");
  const [color, setColor] = useState(listToEdit?.color ?? colors[0]);
  const [error, setError] = useState("");

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

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();

    const nameError = trimmedName ? "" : "Escribe un nombre para la lista.";

    setError(nameError);

    if (nameError) {
      return;
    }

    if (listToEdit) {
      dispatchLists({
        type: "RENAME_LIST",
        payload: {
          id: listToEdit.id,
          name: trimmedName,
        },
      });
    } else {
      const newList: CustomList = {
        id: crypto.randomUUID(),
        name: trimmedName,
        color,
        createdAt: new Date().toISOString(),
      };

      dispatchLists({
        type: "ADD_LIST",
        payload: newList,
      });
    }

    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-text-primary/30 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">
              {listToEdit ? "Editar lista" : "Crear una lista"}
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              Organiza tus tareas a tu manera.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="rounded-lg p-2 text-text-secondary hover:bg-border"
          >
            <X size={19} />
          </button>
        </div>

        <label
          htmlFor="list-name"
          className="mb-2 block text-sm font-medium text-text-primary"
        >
          Nombre de la lista
        </label>

        <input
          id="list-name"
          autoFocus
          maxLength={40}
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Ej. Lecturas, Viajes..."
          className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
        />

        {error && (
          <p role="alert" className="mt-1 text-sm text-red-400">
            {error}
          </p>
        )}

        <fieldset className="mt-5">
          <legend className="mb-3 text-sm font-medium text-text-primary">
            Color de la lista
          </legend>

          <div className="flex flex-wrap gap-3">
            {colors.map((option) => (
              <button
                key={option}
                type="button"
                aria-label={`Elegir color ${option}`}
                aria-pressed={color === option}
                onClick={() => setColor(option)}
                className={`size-8 rounded-full border-2 transition ${
                  color === option
                    ? "scale-110 border-text-primary"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: option }}
              />
            ))}
          </div>
        </fieldset>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2.5 text-sm font-medium text-text-secondary hover:bg-border"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          >
            {listToEdit ? "Editar lista" : "Crear lista"}
          </button>
        </div>
      </form>
    </div>
  );
}
