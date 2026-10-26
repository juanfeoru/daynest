import type { Task } from '../types/types';
import { getTodayDate } from '../utils/date';

export type TaskGroup = {
  title: string;
  tasks: Task[];
};

const today = new Date();

const tomorrowDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate() + 1).padStart(2, '0')}`;

export const tasksSeed: Task[] = [
  {
    id: 'task-1',
    title: 'Terminar el diseño visual',
    description: 'Revisar los componentes y sus espaciados',
    priority: 'media',
    date: getTodayDate(),
    time: '15:00',
    listId: 'work',
    completed: true,
    createdAt: `${getTodayDate()}T09:00:00`,
    updatedAt: `${getTodayDate()}T10:30:00`,
  },
  {
    id: 'task-2',
    title: 'Revisar la paleta de colores',
    description: 'Comprobar contraste y consistencia',
    priority: 'baja',
    date: getTodayDate(),
    listId: 'work',
    completed: false,
    createdAt: `${getTodayDate()}T09:30:00`,
    updatedAt: `${getTodayDate()}T09:30:00`,
  },
  {
    id: 'task-3',
    title: 'Preparar las siguientes mejoras',
    description: 'Revisar la experiencia móvil',
    priority: 'alta',
    date: tomorrowDate,
    time: '10:00',
    listId: 'ideas',
    completed: false,
    createdAt: `${getTodayDate()}T10:00:00`,
    updatedAt: `${getTodayDate()}T10:00:00`,
  },
];
