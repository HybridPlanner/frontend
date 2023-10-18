import { Meeting } from "@/types/Meeting";
import { formatDate } from "@/utils/date";
import classNames from "classnames";
import { type ReactElement } from "react";

interface MeetingDateBadgeProps {
  meeting: Meeting;
  className?: string;
}

export function MeetingDateBadge({
  meeting,
  className,
}: MeetingDateBadgeProps): ReactElement {
  return (
    <span
      className={classNames(
        className,
        'before:content-[""] before:rounded-full before:w-3 before:h-3 before:bg-blue-500 before:relative',
        "before:inline-block before:mr-4",
        "bg-blue-100 px-2 py-1 rounded-full text-blue-700 relative"
      )}
    >
      {formatDate(meeting.start_date, meeting.end_date)}
    </span>
  );
}
