import { createContext } from 'react';
import type { CustomList } from '../types/types';
import type { ListsAction } from '../reducers/listsReducer';

type ListsContextValue = {
  lists: CustomList[];
  dispatchLists: React.Dispatch<ListsAction>;
};

export const ListsContext = createContext<ListsContextValue | null>(null);
