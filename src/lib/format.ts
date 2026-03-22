import { format, parseISO } from "date-fns";
import { zhCN } from "date-fns/locale";

export function formatDisplayDate(date: string) {
  return format(parseISO(date), "PPP", { locale: zhCN });
}

export function formatDuration(durationMinutes: number | null) {
  if (!durationMinutes) {
    return null;
  }

  if (durationMinutes < 60) {
    return `${durationMinutes} 分钟`;
  }

  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  if (minutes === 0) {
    return `${hours} 小时`;
  }

  return `${hours} 小时 ${minutes} 分钟`;
}
