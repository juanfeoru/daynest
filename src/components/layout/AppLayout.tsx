import { useEffect, useState } from "react";
import Sidebar, { type CurrentPage } from "./Sidebar.tsx";
import Header from "./Header.tsx";
import { Outlet, useLocation } from "react-router";
import TaskFormModal from "../tasks/TaskFormModal.tsx";

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const { pathname } = useLocation();

  const currentPage: CurrentPage =
    pathname === "/upcoming" ||
    pathname === "/all-tasks" ||
    pathname === "/completed"
      ? pathname
      : "/";

  useEffect(() => {
    if (isTaskFormOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isTaskFormOpen]);

  return (
    <div className="min-h-screen bg-background md:flex">
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <main className="min-w-0 flex-1 p-5 md:p-10">
        <Header
          onOpen={() => setMobileOpen(true)}
          mobileOpen={mobileOpen}
          currentPage={currentPage}
          onNewTask={() => setIsTaskFormOpen(true)}
        />

        <Outlet />
      </main>

      {isTaskFormOpen && (
        <TaskFormModal onClose={() => setIsTaskFormOpen(false)} />
      )}
    </div>
  );
}
