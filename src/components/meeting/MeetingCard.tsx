import { Meeting } from "@/types/Meeting";
import { formatDate } from "@/utils/date";
import classNames from "classnames";
import { format } from "date-fns";
import { Edit2, Trash2 } from "lucide-react";
import { HTMLAttributes } from "react";
import { MeetingDateBadge } from "./MeetingDateBadge";

type MeetingCardProps = {
  meeting: Meeting;
  isPrevious?: boolean;
  onOpenMeeting?: (meeting: Meeting) => void;
  onDeleteMeeting?: (meeting: Meeting) => void;
} & HTMLAttributes<HTMLDivElement>;

export function MeetingCard({
  meeting,
  className,
  isPrevious = false,
  onOpenMeeting,
  onDeleteMeeting,
  ...props
}: MeetingCardProps): JSX.Element {
  return (
    <div
      className={classNames(
        "grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 grid-row-2 p-4 rounded-xl group",
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

      <button
        type="button"
        className="col-span-full col-start-2 text-lg font-semibold leading-6 tracking-wide text-left"
        onClick={() => onOpenMeeting?.(meeting)}
      >
        {meeting.title}
      </button>
      <div className="col-span-full col-start-2">
        <MeetingDateBadge meeting={meeting} />
      </div>

      {!isPrevious && (
        <div className="row-start-1 row-span-2 col-start-3 invisible group-hover:visible group-focus-within:visible text-gray-600 flex flex-col gap-2">
          <button
            type="button"
            className="btn hover:text-red-500 p-2 rounded-full hover:bg-gray-400 hover:bg-opacity-20"
            aria-label="Delete button"
            onClick={() => onDeleteMeeting?.(meeting)}
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
