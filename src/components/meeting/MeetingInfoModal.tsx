import { Meeting } from "@/types/Meeting";
import classNames from "classnames";
import { forwardRef, HTMLAttributes, type ReactElement } from "react";
import { Button } from "../base/button/button";
import { X } from "lucide-react";
import { MeetingDateBadge } from "./MeetingDateBadge";

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
        "open:backdrop-blur-lg open:backdrop:fill-gray-800",
        "invisible opacity-0 open:visible open:opacity-100 open:transition-all open:duration-100 ease-out",
        "scale-50 open:scale-100",
        "bg-transparent top-0 left-0 fixed w-full md:max-w-screen-sm z-50 p-8 md:flex md:flex-col md:justify-center",
        "bg-white rounded-xl shadow-lg overflow-hidden"
      )}
    >
      {meeting && (
        <form method="dialog">
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
              </div>

              <aside className="w-full md:w-52"></aside>
            </div>
          </div>
        </form>
      )}
    </dialog>
  );
});
