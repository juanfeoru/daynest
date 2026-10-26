# Daynest 🪺

Daynest es una aplicación de tareas (to-do) moderna y minimalista para organizar tu día. Un "nido" donde guardar, ordenar y completar todo lo que necesitas hacer.

## ✨ Características

- Crear, editar y eliminar tareas
- Marcar tareas como completadas
- Organización diaria de tus pendientes
- Interfaz rápida y responsiva
- Navegación entre vistas con enrutamiento del lado del cliente

## 🛠️ Tecnologías

- **React 19** — biblioteca de UI
- **TypeScript** — tipado estático
- **Vite** — empaquetador y servidor de desarrollo
- **Tailwind CSS v4** — estilos utilitarios
- **React Router** — enrutamiento
- **Lucide React** — iconografía
- **ESLint** — linting
- **pnpm** — gestor de paquetes

## 📋 Requisitos previos

- [Node.js](https://nodejs.org/) (v20 o superior)
- [pnpm](https://pnpm.io/) instalado

## 🚀 Instalación

```bash
pnpm install
```

## 💻 Uso

Inicia el servidor de desarrollo con recarga en caliente:

```bash
pnpm dev
```

Abre el navegador en la dirección que muestre la terminal (por defecto `http://localhost:5173`).

## 📜 Scripts disponibles

| Comando        | Descripción                                        |
| -------------- | -------------------------------------------------- |
| `pnpm dev`     | Inicia el servidor de desarrollo                   |
| `pnpm build`   | Compila TypeScript y genera el build de producción |
| `pnpm preview` | Previsualiza el build de producción                |
| `pnpm lint`    | Ejecuta ESLint sobre el proyecto                   |

## 📁 Estructura del proyecto

```
daynest/
├── public/            # Recursos estáticos (favicon, iconos)
├── src/
│   ├── App.tsx        # Componente principal
│   ├── main.tsx       # Punto de entrada
│   └── index.css      # Estilos globales (Tailwind)
├── index.html         # Plantilla HTML
├── vite.config.ts     # Configuración de Vite
└── package.json       # Dependencias y scripts
```

## 🤝 Contribuir

1. Haz un fork del proyecto
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza tus cambios y haz commit (`git commit -m 'Añade nueva funcionalidad'`)
4. Sube la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado. Todos los derechos reservados.
