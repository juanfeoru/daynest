import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { TasksProvider } from "./context/TasksProvider.tsx";
import { ListsProvider } from "./context/ListsProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <TasksProvider>
        <ListsProvider>
          <App />
        </ListsProvider>
      </TasksProvider>
    </BrowserRouter>
  </StrictMode>,
);
