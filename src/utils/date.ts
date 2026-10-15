export function getTodayDate(): string {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function isSameDate(dateA: string, dateB: string): boolean {
  return dateA === dateB;
}

export function isPastDate(date: string): boolean {
  return date < getTodayDate();
}

export function getTomorrowDate(): string {
  const today = getTodayDate();
  const [year, month, day] = today.split("-").map(Number);

  const tomorrow = new Date(year, month - 1, day);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const nextYear = tomorrow.getFullYear();
  const nextMonth = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const nextDay = String(tomorrow.getDate()).padStart(2, "0");

  return `${nextYear}-${nextMonth}-${nextDay}`;
}

export function formatTaskGroupDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  const parsedDate = new Date(year, month - 1, day);

  const formatted = new Intl.DateTimeFormat("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(parsedDate);

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
