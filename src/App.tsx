import { Route, Routes } from "react-router";
import AppLayout from "./components/layout/AppLayout";
import MyDayPage from "./pages/MyDayPage";
import UpcomingPage from "./pages/UpcomingPage";
import AllTasks from "./pages/AllTasks";
import CompletedPage from "./pages/CompletedPage";
import ListPage from "./pages/ListPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<MyDayPage />} />
        <Route path="/upcoming" element={<UpcomingPage />} />
        <Route path="/all-tasks" element={<AllTasks />} />
        <Route path="/completed" element={<CompletedPage />} />
        <Route path="/lists/:listId" element={<ListPage />} />
      </Route>
    </Routes>
  );
}

export default App;
