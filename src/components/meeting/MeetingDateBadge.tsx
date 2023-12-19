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
  const formatOngoingDate = (start: Date, end: Date): string => {
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

  const getContent = () => {
    if (meeting.started) {
      return (
        "Ongoing until " +
        formatOngoingDate(meeting.start_date, meeting.end_date)
      );
    }
    return formatDate(meeting.start_date, meeting.end_date);
  };

  const getBadgeClass = () => {
    if (meeting.started) {
      return "before:bg-red-500 text-red-700 bg-red-100 before:animate-pulse";
    }

    if (meeting.end_date < new Date()) {
      return "before:bg-gray-500 text-gray-700 bg-gray-100";
    }

    return "before:bg-blue-500 text-blue-700 bg-blue-100";
  };

  return (
    <span
      className={classNames(
        className,
        'before:content-[""] before:rounded-full before:w-2 before:h-2 before:relative',
        "before:inline-block before:mr-2 before:-top-0.5",
        "px-3 py-1 rounded-full relative font-medium w-fit",
        getBadgeClass()
      )}
    >
      {getContent()}
    </span>
  );
}
