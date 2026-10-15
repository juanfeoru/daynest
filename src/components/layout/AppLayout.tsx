import { useEffect, useState } from "react";
import Sidebar, { type CurrentPage } from "./Sidebar.tsx";
import Header from "./Header.tsx";
import { Outlet, useLocation } from "react-router";
import TaskFormModal from "../tasks/TaskFormModal.tsx";
import type { Task } from "../../types/types.ts";

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>();
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

  function handleNewTask() {
    setTaskToEdit(undefined);
    setIsTaskFormOpen(true);
  }

  function handleEditTask(task: Task) {
    setTaskToEdit(task);
    setIsTaskFormOpen(true);
  }

  function handleCloseModal() {
    setIsTaskFormOpen(false);
    setTaskToEdit(undefined);
  }

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
          onNewTask={handleNewTask}
        />

        <Outlet context={{ onEditTask: handleEditTask }} />
      </main>

      {isTaskFormOpen && (
        <TaskFormModal taskToEdit={taskToEdit} onClose={handleCloseModal} />
      )}
    </div>
  );
}
