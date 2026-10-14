import { Menu, Sprout, Plus } from "lucide-react";
import type { CurrentPage } from "./Sidebar";
import { NavLink } from "react-router";

interface HeaderProps {
  onOpen: () => void;
  mobileOpen: boolean;
  currentPage: CurrentPage;
  onNewTask: () => void;
}

const pageContent: Record<CurrentPage, { title: string; description: string }> =
  {
    "/": {
      title: "Haz que hoy cuente.",
      description: "Un pequeño progreso sigue siendo progreso.",
    },
    "/upcoming": {
      title: "Lo que viene.",
      description: "Organiza con calma lo que tienes por delante.",
    },
    "/all-tasks": {
      title: "Todas tus tareas.",
      description: "Todo lo que tienes pendiente, en un solo lugar.",
    },
    "/completed": {
      title: "Mira lo lejos que has llegado.",
      description: "Cada pequeño paso también cuenta.",
    },
  };

export default function Header({
  onOpen,
  mobileOpen,
  currentPage,
  onNewTask,
}: HeaderProps) {
  const { title, description } = pageContent[currentPage];

  return (
    <header className="mb-8">
      <div className="sticky top-0 z-30 -mx-5 -mt-5 mb-7 flex items-center justify-between border-b border-border/70 bg-background/80 px-5 py-3 backdrop-blur-md md:hidden">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-xl bg-sage-light">
            <Sprout size={21} strokeWidth={1.8} className="text-primary" />
          </div>

          <NavLink
            to="/"
            className="text-lg font-bold tracking-tight text-text-primary"
          >
            Daynest
          </NavLink>
        </div>

        <button
          type="button"
          onClick={onOpen}
          aria-label="Abrir navegación"
          aria-controls="app-sidebar"
          aria-expanded={mobileOpen}
          className="flex size-9 items-center justify-center rounded-xl border border-border bg-surface text-text-secondary transition-colors hover:bg-sage-light hover:text-primary"
        >
          <Menu size={19} strokeWidth={1.8} />
        </button>
      </div>
      <div className="flex flex-col gap-4 border-b border-border/70 pb-6 sm:flex-row sm:items-end sm:justify-between md:pb-7">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            {title}
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-text-secondary sm:text-base">
            {description}
          </p>
        </div>

        <button
          type="button"
          onClick={onNewTask}
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:opacity-90 sm:self-auto sm:w-fit"
        >
          <Plus size={18} />
          Nueva tarea
        </button>
      </div>
    </header>
  );
}
