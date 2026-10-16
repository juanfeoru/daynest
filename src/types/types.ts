export type Priority = "baja" | "media" | "alta";

export type ListId = "personal" | "work" | "ideas";

export type TaskStatus = "pendiente" | "atrasada" | "completada";

export interface CustomList {
  id: string;
  name: string;
  color: string;
  createdAt: string;
}

export type Task = {
  id: string;
  title: string;
  description?: string;
  date: string; // YYYY-MM-DD
  time?: string; // HH:mm
  priority: Priority;
  listId: string;
  completed: boolean;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
};
