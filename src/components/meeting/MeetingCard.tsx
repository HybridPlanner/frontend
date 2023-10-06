import { Meeting } from "@/types/Meeting";
import { formatDate } from "@/utils/date";
import classNames from "classnames";
import { format } from "date-fns";
import { HTMLAttributes } from "react";

type MeetingCardProps = {
  meeting: Meeting;
} & HTMLAttributes<HTMLDivElement>;

export function MeetingCard({
  meeting,
  className,
  ...props
}: MeetingCardProps): JSX.Element {
  return (
    <div
      className={classNames(
        "grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 grid-row-2 p-4 rounded-xl",
        className
      )}
      {...props}
    >
      <div className="row-span-2">
        <div className="rounded-xl overflow-hidden flex flex-col bg-white shadow-md row-span-2">
          <span className="bg-red-500 px-2 pt-0.5 text-[0.7rem] text-white leading-4">
            {format(meeting.start_date, "LLL.").toUpperCase()}
          </span>
          <span className="text-gray-900 font-bold text-xl px-2 py-1 leading-4 text-center">
            {meeting.start_date.getDay()}
          </span>
        </div>
      </div>

      <div className="col-span-full col-start-2 text-lg font-semibold leading-6 tracking-wide">
        {meeting.title}
      </div>
      <div className="col-span-full col-start-2">
        <span
          className={classNames(
            'before:content-[""] before:rounded-full before:w-3 before:h-3 before:bg-blue-500 before:relative',
            "before:inline-block before:mr-4",
            "bg-blue-100 px-2 py-1 rounded-full text-blue-700 relative"
          )}
        >
          {formatDate(meeting.start_date, meeting.end_date)}
        </span>
      </div>
      <div className="col-span-full col-start-2"></div>
    </div>
  );
}
