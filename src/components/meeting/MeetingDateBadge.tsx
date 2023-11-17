import { Meeting } from "@/types/Meeting";
import { formatDate } from "@/utils/date";
import classNames from "classnames";
import { format, isToday, isTomorrow } from "date-fns";
import { type ReactElement } from "react";

interface MeetingDateBadgeProps {
  meeting: Meeting;
  className?: string;
}

export function MeetingDateBadge({
  meeting,
  className,
}: MeetingDateBadgeProps): ReactElement {
  if (meeting.started) {
    const formatDate = (start: Date, end: Date): string => {
      if (
        isToday(end) ||
        isTomorrow(end) ||
        format(start, "d") === format(end, "d")
      ) {
        return format(end, "HH:mm");
      } else {
        return `${format(end, "EEEE d")} at ${format(end, "HH:mm")}`;
      }
    };

    return (
      <span
        className={classNames(
          className,
          'before:content-[""] before:rounded-full before:w-2 before:h-2 before:bg-red-500 before:absolute',
          "before:inline-block before:mr-2 before:top-1.5 before:left-2 before:animate-pulse",

          "bg-red-100 px-3 rounded-full text-red-700 relative font-medium pl-5"
        )}
      >
        Ongoing until {formatDate(meeting.start_date, meeting.end_date)}
      </span>
    );
  }

  return (
    <span
      className={classNames(
        className,
        'before:content-[""] before:rounded-full before:w-2 before:h-2 before:bg-blue-500 before:relative',
        "before:inline-block before:mr-2 before:-top-0.5",
        "bg-blue-100 px-3 py-1 rounded-full text-blue-700 relative font-medium"
      )}
    >
      {formatDate(meeting.start_date, meeting.end_date)}
    </span>
  );
}
