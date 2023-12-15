import { Meeting } from "@/types/Meeting";
import { isToday, isTomorrow, format, isBefore } from "date-fns";

/**
 * Sets the time of the given date object to the specified hours and minutes.
 * @param date - The date object to set the time on.
 * @param hours - The hours to set.
 * @param minutes - The minutes to set.
 * @returns The modified date object with the updated time.
 */
export function setTime(date: Date, hours: number, minutes: number): Date {
  date.setHours(hours);
  date.setMinutes(minutes);
  return date;
}

/**
 * Formats the start and end dates into a string representation.
 * 
 * @param start - The start date.
 * @param end - The end date.
 * @returns The formatted string representation of the dates.
 */
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

/**
 * Formats a Date object to a string representation suitable for an input value.
 * The format is "yyyy-MM-dd'T'HH:mm".
 * 
 * @param date - The Date object to format.
 * @returns The formatted string representation of the date.
 */
export function formatDatetimeToInputValue(date: Date): string {
  return format(date, "yyyy-MM-dd'T'HH:mm");
}

/**
 * Sorts an array of meetings in ascending order based on their start and end dates.
 * @param meetings - The array of meetings to be sorted.
 */
export function sortMeetings(meetings: Meeting[]) {
  meetings.sort((m1, m2) => {
    // If m1 start date is before m2 start date, return -1
    if (isBefore(m1.start_date, m2.start_date)) {
      return 1;
    }

    // If m1 start date is after m2 start date, return 1
    if (isBefore(m2.start_date, m1.start_date)) {
      return 1;
    }

    // If m1 and m2 start dates are the same, compare end dates
    if (isBefore(m1.end_date, m2.end_date)) {
      return 1;
    }

    if (isBefore(m2.end_date, m1.end_date)) {
      return -1;
    }

    // If m1 and m2 end dates are the same, return 0
    return 0;
  });
}
