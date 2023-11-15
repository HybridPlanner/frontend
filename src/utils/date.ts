import { Meeting } from "@/types/Meeting";
import { isToday, isTomorrow, format, isBefore } from "date-fns";


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

export function formatDatetimeToInputValue(date: Date): string {
    return format(date, "yyyy-MM-dd'T'HH:mm");
}

export function sortMeetings(meetings: Meeting[]) {
    meetings.sort((m1, m2) => {
        // If m1 start date is before m2 start date, return -1
        if (isBefore(m1.start_date, m2.start_date)) {
            return -1;
        }

        // If m1 start date is after m2 start date, return 1
        if (isBefore(m2.start_date, m1.start_date)) {
            return 1;
        }

        // If m1 and m2 start dates are the same, compare end dates
        if (isBefore(m1.end_date, m2.end_date)) {
            return -1;
        }

        if (isBefore(m2.end_date, m1.end_date)) {
            return 1;
        }

        // If m1 and m2 end dates are the same, return 0
        return 0;
    })
}