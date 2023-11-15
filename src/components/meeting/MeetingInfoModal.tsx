import { Meeting } from "@/types/Meeting";
import classNames from "classnames";
import { forwardRef, HTMLAttributes, type ReactElement } from "react";
import { Button } from "../base/button/button";
import { Pencil, X } from "lucide-react";
import { MeetingDateBadge } from "./MeetingDateBadge";
import { isAfter, isBefore } from "date-fns";

type MeetingInfoModalProps = {
  meeting: Meeting | undefined;
} & HTMLAttributes<HTMLDialogElement>;

export const MeetingInfoModal = forwardRef<
  HTMLDialogElement,
  MeetingInfoModalProps
>(({ meeting, className, ...props }, ref) => {
  return (
    <dialog
      ref={ref}
      {...props}
      className={classNames(
        className,
        "backdrop:bg-gray-800/50",
        "invisible opacity-0 open:visible open:opacity-100 open:transition-all open:duration-100 ease-out",
        "scale-50 open:scale-100",
        "bg-transparent top-0 left-0 fixed w-full md:max-w-screen-sm z-50 p-8 md:flex md:flex-col md:justify-center",
        "bg-white rounded-xl shadow-lg overflow-hidden"
      )}
    >
      {meeting && (
        <form method="dialog">
          {isBefore(new Date(), new Date(meeting.start_date)) && (
            <button
              id="edit"
              aria-label="Edit meeting"
              formNoValidate
              className="absolute top-8 right-20 btn p-2 rounded-full hover:bg-gray-400 hover:bg-opacity-20"
            >
              <Pencil />
            </button>
          )}
          <button
            id="close"
            aria-label="close"
            formNoValidate
            className="absolute top-8 right-8 btn p-2 rounded-full hover:bg-gray-400 hover:bg-opacity-20"
          >
            <X />
          </button>

          <h1 className="text-blue-600 font-semibold text-2xl">
            {meeting.title}
          </h1>

          <div className="m-4">
            <MeetingDateBadge meeting={meeting} className="mb-4 inline-block" />

            <div className="flex flex-col-reverse md:flex-row">
              <div className="flex-1">
                <p>{meeting.description}</p>

                <div className="my-4">
                  <h2 className="font-semibold mb-2">Attendees</h2>
                  {/* Attendees list */}
                  <ul className="flex flex-wrap">
                    {meeting.attendees.map((attendee) => (
                      <li
                        key={attendee.id}
                        className={classNames(
                          "bg-purple-300 text-purple-800 bg-opacity-50 rounded-full px-4",
                          "before:rounded-full"
                        )}
                      >
                        {attendee.email}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <aside className="w-full md:w-52">{/* Meeting actions */}</aside>
            </div>
          </div>
        </form>
      )}
    </dialog>
  );
});
