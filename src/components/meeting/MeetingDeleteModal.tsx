import { Meeting } from "@/types/Meeting";
import classNames from "classnames";
import {
  forwardRef,
  HTMLAttributes,
  useCallback,
  type ReactElement,
  useRef,
  useImperativeHandle,
} from "react";
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
  const modalRef = useRef<HTMLDialogElement>(null);

  const onClose = useCallback(() => {
    if (!meeting || !modalRef.current) return;

    if (modalRef.current.returnValue === "delete") {
      onDelete(meeting);
    }
  }, [meeting]);

  useImperativeHandle(ref, () => modalRef.current as HTMLDialogElement);

  return (
    <dialog
      ref={modalRef}
      {...props}
      onClose={onClose}
      className={classNames(
        className,
        "backdrop-blur-lg",
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
              value="delete"
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
