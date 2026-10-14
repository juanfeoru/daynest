import type { Task } from "../types/types";

export type TaskAction =
  | {
      type: "ADD_TASK";
      payload: Task;
    }
  | {
      type: "UPDATE_TASK";
      payload: Pick<Task, "id"> & Partial<Omit<Task, "id">>;
    }
  | {
      type: "DELETE_TASK";
      payload: Pick<Task, "id">;
    }
  | {
      type: "TOGGLE_TASK";
      payload: Pick<Task, "id">;
    };

export function tasksReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];

    case "UPDATE_TASK": {
      const { id, ...changes } = action.payload;

      return state.map((s) => {
        if (s.id === id) {
          return {
            ...s,
            ...changes,
          };
        }

        return s;
      });
    }

    case "DELETE_TASK":
      return state.filter((s) => s.id !== action.payload.id);

    case "TOGGLE_TASK": {
      return state.map((s) => {
        if (s.id === action.payload.id) {
          return {
            ...s,
            completed: !s.completed,
          };
        }

        return s;
      });
    }

    default:
      return state;
  }
}
