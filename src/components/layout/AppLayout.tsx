import { useState } from "react";
import Sidebar, { type CurrentPage } from "./Sidebar.tsx";
import Header from "./Header.tsx";
import { useLocation } from "react-router";

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  const currentPage: CurrentPage =
    pathname === "/upcoming" ||
    pathname === "/all-tasks" ||
    pathname === "/completed"
      ? pathname
      : "/";

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
        />
      </main>
    </div>
  );
}
