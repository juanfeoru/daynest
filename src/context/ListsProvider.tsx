import { useEffect, useReducer } from "react";
import { listsReducer } from "../reducers/listsReducer";
import { listsSeed } from "../data/lists";
import { ListsContext } from "./ListsContext";
import type { CustomList } from "../types/types";

function loadLists(): CustomList[] {
  try {
    const storedLists = localStorage.getItem("daynest-lists");

    if (storedLists === null) return listsSeed;

    const parsed: unknown = JSON.parse(storedLists);

    if (!Array.isArray(parsed)) return listsSeed;

    return parsed as CustomList[];
  } catch {
    return listsSeed;
  }
}

function saveLists(lists: CustomList[]) {
  try {
    localStorage.setItem("daynest-lists", JSON.stringify(lists));
  } catch (error) {
    console.error("Error al guardar las listas:", error);
  }
}

export function ListsProvider({ children }: { children: React.ReactNode }) {
  const [lists, dispatchLists] = useReducer(listsReducer, undefined, loadLists);

  useEffect(() => {
    saveLists(lists);
  }, [lists]);

  return (
    <ListsContext.Provider value={{ lists, dispatchLists }}>
      {children}
    </ListsContext.Provider>
  );
}
