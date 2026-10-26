import { useEffect, useState } from 'react';
import {
  Sprout,
  Sun,
  CalendarDays,
  ListTodo,
  CheckCircle2,
  Plus,
  X,
  Lightbulb,
  type LucideIcon,
  Pencil,
  Trash2,
  Ellipsis,
} from 'lucide-react';
import { NavLink } from 'react-router';
import { useLists } from '../../hooks/useLists';
import type { CustomList } from '../../types/types';

export type CurrentPage =
  | '/'
  | '/upcoming'
  | '/all-tasks'
  | '/completed'
  | '/personal'
  | '/work'
  | '/ideas';

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
  onCreateList?: () => void;
  onEditList: (list: CustomList) => void;
}

interface NavItem {
  to: CurrentPage;
  label: string;
  icon: LucideIcon;
}

const navigationItems: NavItem[] = [
  { to: '/', label: 'Mi día', icon: Sun },
  { to: '/upcoming', label: 'Próximo', icon: CalendarDays },
  { to: '/all-tasks', label: 'Todas las tareas', icon: ListTodo },
  { to: '/completed', label: 'Completadas', icon: CheckCircle2 },
];

export default function Sidebar({
  mobileOpen,
  onMobileClose,
  onCreateList,
  onEditList,
}: SidebarProps) {
  const { lists, dispatchLists } = useLists();

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onMobileClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [mobileOpen, onMobileClose]);

  const handleNavigate = () => {
    onMobileClose();
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-150 min-w-0 flex-1 ${
      isActive
        ? 'bg-sage-light text-[#3D5739]'
        : 'text-[#686B63] hover:bg-[#F0EEE7] hover:text-text-primary'
    }

    `;

  function handleDeleteList(id: string) {
    dispatchLists({
      type: 'DELETE_LIST',
      payload: { id },
    });
  }

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onMobileClose}
        className={`fixed inset-0 z-40 bg-text-primary/30 backdrop-blur-[2px]
          transition-opacity duration-300 md:hidden
          ${
            mobileOpen
              ? 'visible opacity-100'
              : 'invisible opacity-0 pointer-events-none'
          }`}
      />

      <aside
        id="app-sidebar"
        aria-label="Navegación principal"
        aria-modal={mobileOpen ? true : undefined}
        className={`
          fixed inset-y-0 left-0 z-50 flex h-dvh w-64 overflow-y-auto overscroll-y-contain sidebar-scrollbar flex-col border-r border-border bg-background px-4 py-5 transition-transform duration-300 ease-in-out md:sticky md:top-0 md:z-auto md:h-screen md:translate-x-0
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="mb-9 flex items-center justify-between px-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E4EBDD]">
              <Sprout size={23} strokeWidth={1.8} className="text-[#587353]" />
            </div>

            <span className="text-xl font-bold tracking-tight text-text-primary">
              Daynest
            </span>
          </div>

          <button
            type="button"
            onClick={onMobileClose}
            aria-label="Close navigation"
            className="rounded-lg p-2 text-text-secondary transition-colors hover:bg-border  md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav aria-label="Espacio de trabajo" className="flex flex-col gap-1">
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#999A91]">
            Espacio de trabajo
          </p>

          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={navLinkClass}
                onClick={() => handleNavigate()}
              >
                <Icon size={19} strokeWidth={1.8} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <section className="mt-9">
          <div className="mb-3 flex items-center justify-between px-3">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#999A91]">
              Mis listas
            </h2>

            <button
              type="button"
              onClick={onCreateList}
              aria-label="Crear una nueva lista"
              title="Crear una nueva lista"
              className="rounded-md p-1 text-text-secondary transition-colors hover:bg-border hover:text-primary"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {lists.map((list) => (
              <div key={list.id} className="group flex items-center gap-1">
                <NavLink
                  to={`/lists/${list.id}`}
                  onClick={handleNavigate}
                  className={navLinkClass}
                >
                  <span
                    aria-hidden="true"
                    className="block size-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: list.color }}
                  />
                  <span className="min-w-0 truncate">{list.name}</span>
                </NavLink>

                <div className="relative shrink-0">
                  <button
                    type="button"
                    aria-label={`Opciones de ${list.name}`}
                    aria-haspopup="menu"
                    aria-expanded={openMenuId === list.id}
                    onClick={() =>
                      setOpenMenuId((currentId) =>
                        currentId === list.id ? null : list.id,
                      )
                    }
                    className="flex size-8 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-background hover:text-text-primary md:opacity-0 md:group-hover:opacity-100 "
                  >
                    <Ellipsis size={16} />
                  </button>

                  {openMenuId === list.id && (
                    <div
                      role="menu"
                      className="absolute right-0 top-full z-20 mt-1 w-44 rounded-xl border border-border bg-surface p-1.5 shadow-lg"
                    >
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setOpenMenuId(null);
                          onEditList(list);
                        }}
                        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-text-primary transition-colors hover:bg-background"
                      >
                        <Pencil size={15} />
                        Editar lista
                      </button>

                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setOpenMenuId(null);
                          handleDeleteList(list.id);
                        }}
                        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-red-500 transition-colors hover:bg-red-500/10"
                      >
                        <Trash2 size={15} />
                        Eliminar lista
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-auto space-y-3 pt-6">
          <div className="rounded-2xl border border-border bg-white/70 p-3.5">
            <div className="mb-2 flex items-center gap-2">
              <Lightbulb size={17} className="text-[#A58A49]" />
              <span className="text-xs font-semibold text-[#4E554A]">
                Un pequeño recordatorio
              </span>
            </div>

            <p className="text-xs leading-relaxed text-text-secondary">
              No tienes que hacerlo todo hoy. Un pequeño paso cuenta.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
