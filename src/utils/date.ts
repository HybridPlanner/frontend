import { isToday, isTomorrow, format } from "date-fns";


export function setTime(date: Date, hours: number, minutes: number): Date {
    date.setHours(hours);
    date.setMinutes(minutes);
    return date;
  }
  
export function formatDate(start: Date, end: Date): string {
let startFormat = "";
let endFormat = "";

if (isToday(start)) {
    startFormat += "Today from ";
} else if (isTomorrow(start)) {
    startFormat += "Tomorrow from ";
} else {
    startFormat += `${format(start, "EEEE d")} from `;
}

if (
    isToday(end) ||
    isTomorrow(end) ||
    format(start, "d") === format(end, "d")
) {
    endFormat += format(end, "HH:mm");
} else {
    endFormat += `${format(end, "EEEE d")} at ${format(end, "HH:mm")}`;
}

startFormat += format(start, "HH:mm") + " to " + endFormat;

return startFormat;
}