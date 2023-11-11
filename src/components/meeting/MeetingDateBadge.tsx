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
        'before:content-[""] before:rounded-full before:w-2 before:h-2 before:bg-blue-500 before:relative',
        "before:inline-block before:mr-2",
        "bg-blue-100 px-3 py-1 rounded-full text-blue-700 relative font-medium"
      )}
    >
      {formatDate(meeting.start_date, meeting.end_date)}
    </span>
  );
}
