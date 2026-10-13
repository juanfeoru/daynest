import TaskList from "../components/tasks/TaskList";

export default function MyDayPage() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <TaskList
        title="Mis tareas"
        description="Un paso a la vez, sin prisas."
      />
    </div>
  );
}
