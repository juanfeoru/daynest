import type { CustomList } from '../types/types';

export type ListsAction =
  | {
      type: 'ADD_LIST';
      payload: CustomList;
    }
  | {
      type: 'DELETE_LIST';
      payload: { id: string };
    }
  | {
      type: 'RENAME_LIST';
      payload: { id: string; name: string };
    };

export function listsReducer(
  state: CustomList[],
  action: ListsAction,
): CustomList[] {
  switch (action.type) {
    case 'ADD_LIST':
      if (state.some((list) => list.id === action.payload.id)) {
        return state;
      }

      return [...state, action.payload];

    case 'DELETE_LIST':
      return state.filter((list) => list.id !== action.payload.id);

    case 'RENAME_LIST':
      return state.map((list) =>
        list.id === action.payload.id
          ? { ...list, name: action.payload.name }
          : list,
      );

    default:
      return state;
  }
}
