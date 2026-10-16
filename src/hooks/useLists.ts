import { useContext } from "react";
import { ListsContext } from "../context/ListsContext";

export function useLists() {
  const context = useContext(ListsContext);

  if (context === null) {
    throw new Error("useLists debe utilizarse dentro de ListsProvider");
  }

  return context;
}
