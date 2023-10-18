import { Meeting } from "@/types/Meeting";
import classNames from "classnames";
import { forwardRef, HTMLAttributes, type ReactElement } from "react";
import { Button } from "../base/button/button";
import { X } from "lucide-react";
import { MeetingDateBadge } from "./MeetingDateBadge";

type MeetingInfoModalProps = {
  meeting: Meeting | undefined;
  onDelete: (meeting: Meeting) => void;
} & HTMLAttributes<HTMLDialogElement>;

export const MeetingDeleteModal = forwardRef<
  HTMLDialogElement,
  MeetingInfoModalProps
>(({ meeting, className, onDelete, ...props }, ref) => {
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
        <form method="dialog" onSubmit={() => onDelete?.(meeting)}>
          <button
            id="close"
            aria-label="close"
            formNoValidate
            className="absolute top-8 right-8 btn p-2 rounded-full hover:bg-gray-400 hover:bg-opacity-20"
          >
            <X className="text-gray-700" />
          </button>

          <h1 className="text-blue-600 font-semibold text-2xl">
            Delete <span className="italic">{meeting.title}</span>?
          </h1>

          <p className="m-4 text-gray-700">
            This action cannot be undone. All the data associated with this
            meeting will be permanently deleted.
          </p>

          <menu className="flex flex-col md:flex-row-reverse gap-3">
            <Button
              type="submit"
              className="md:ml-3"
              bgColor="bg-red-500 hover:bg-red-600"
              outlineColor="outline-red-500"
            >
              Delete
            </Button>

            <Button
              formNoValidate
              bgColor="bg-transparent hover:bg-gray-400 focus-within:bg-gray-400 hover:bg-opacity-30 focus-within:bg-opacity-30"
              textColor="text-gray-600"
            >
              Cancel
            </Button>
          </menu>
        </form>
      )}
    </dialog>
  );
});
