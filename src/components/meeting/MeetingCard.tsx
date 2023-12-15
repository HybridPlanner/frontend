import { Meeting } from "@/types/Meeting";
import classNames from "classnames";
import { format } from "date-fns";
import { LinkIcon, Pen, Trash2 } from "lucide-react";
import { HTMLAttributes } from "react";
import { MeetingDateBadge } from "./MeetingDateBadge";
import { Link } from "react-router-dom";

type MeetingCardProps = {
  meeting: Meeting;
  isPrevious?: boolean;
  onOpenMeeting?: (meeting: Meeting) => void;
  onDeleteMeeting?: (meeting: Meeting) => void;
  onEditMeeting?: (meeting: Meeting) => void;
} & HTMLAttributes<HTMLDivElement>;

export function MeetingCard({
  meeting,
  className,
  isPrevious = false,
  onOpenMeeting,
  onDeleteMeeting,
  onEditMeeting,
  ...props
}: MeetingCardProps): JSX.Element {
  return (
    <div
      className={classNames(
        "grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 grid-row-2 p-4 rounded-xl group relative",
        className
      )}
      {...props}
    >
      <div className="row-span-2">
        <div className="rounded-md overflow-hidden flex flex-col bg-white shadow-md row-span-2">
          <span className="bg-red-500 px-2 pt-0.5 text-[0.7rem] text-white leading-4">
            {format(meeting.start_date, "LLL.").toUpperCase()}
          </span>
          <span className="text-gray-900 font-bold text-xl px-2 py-1 leading-4 text-center">
            {meeting.start_date.getDate()}
          </span>
        </div>
      </div>

      <button
        type="button"
        className={classNames(
          "col-span-full col-start-2 text-lg font-semibold leading-6 tracking-wide text-left",
          "after:absolute after:content-[''] after:top-0 after:right-0 after:left-0 after:bottom-0"
        )}
        onClick={() => onOpenMeeting?.(meeting)}
      >
        {meeting.title}
      </button>
      <div className="col-span-full col-start-2">
        <MeetingDateBadge meeting={meeting} />
      </div>

      {/* Is the meeting isn't a previous meeting, then show the actions buttons */}
      {!isPrevious && (
        <div className="row-start-1 row-span-2 col-start-3 invisible group-hover:visible group-focus-within:visible text-gray-600 flex flex-col gap-2">
          <div className="flex flex-row z-[2]">
          {meeting.publicUrl && (
              <Link
                type="button"
                className="btn hover:text-blue-500 p-2 rounded-full hover:bg-gray-400 hover:bg-opacity-20"
                aria-label="Open waiting page"
                to={`/meeting/${meeting.id}`}
              >
                <LinkIcon className="w-5 h-5" />
              </Link>
            )}

            <button
              type="button"
              className="btn hover:text-blue-500 p-2 transition rounded-full hover:bg-gray-400 hover:bg-opacity-20"
              aria-label="Update meeting"
              onClick={() => onEditMeeting?.(meeting)}
            >
              <Pen className="w-5 h-5" />  
            </button>
            
            <button
              type="button"
              className="btn hover:text-red-500 p-2 transition rounded-full hover:bg-gray-400 hover:bg-opacity-20"
              aria-label="Delete meeting"
              onClick={() => onDeleteMeeting?.(meeting)}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
