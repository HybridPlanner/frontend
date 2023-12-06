import { CreateMeetingInput, Meeting } from "@/types/Meeting";
import classNames from "classnames";
import {
  forwardRef,
  HTMLAttributes,
  useCallback,
  useRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { Button } from "../base/button/button";
import { Calendar, Edit3, Loader2, Pencil, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { formatDatetimeToInputValue as dateForInput } from "@/utils/date";
import { addMinutes, isAfter, isBefore } from "date-fns";
import { Input } from "../form/input/input";
import { InputTags } from "../form/inputTags/inputTags";
import { Textarea } from "../form/textarea/textarea";

type MeetingUpdateModal = {
  meeting: Meeting | undefined;
  onUpdate: (id: number, data: Partial<CreateMeetingInput>) => Promise<void>;
} & HTMLAttributes<HTMLDialogElement>;

const END_DATE_LIMIT = 5;

interface FormInputs {
  title: string;
  start_date: string;
  end_date: string;
  attendees: string[];
  description: string;
}

export const MeetingUpdateModal = forwardRef<
  HTMLDialogElement,
  MeetingUpdateModal
>(({ meeting, className, onUpdate: onUpdate, ...props }, ref) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
    watch,
    getValues,
    trigger,
    setValue,
  } = useForm<FormInputs>({
    mode: "all",
  });

  // Since react-multi-email isn't compatible with react-hook-form, we need to
  // register the input manually
  register("attendees", {
    required: "There must be at least one attendee.",
    value: [],
  });

  const [loading, setLoading] = useState(false);
  const startDate = watch("start_date", "Invalid Date");
  const endDate = watch("end_date", "Invalid Date");
  const now = new Date();

  useEffect(() => {
    if (startDate === "Invalid Date" || endDate === "Invalid Date") return;

    // Update the "end_date" value only if it is behind the start date
    const minimalEnd = addMinutes(new Date(startDate), END_DATE_LIMIT);

    // If the minimal date is after the current end date, update it
    if (!isAfter(minimalEnd, new Date(endDate))) return;

    setValue("end_date", dateForInput(minimalEnd), {
      shouldValidate: true,
    });
  }, [startDate, endDate]);

  useEffect(() => {
    if (!meeting) return;

    setValue("title", meeting?.title);
    setValue("description", meeting?.description || '');
    setValue("start_date", dateForInput(meeting?.start_date));
    setValue("end_date", dateForInput(meeting?.end_date));
    setValue("attendees", meeting?.attendees.map((a) => a.email));

    trigger();
  }, [meeting]);

  const onClose = useCallback(async () => {
    if (!meeting || !modalRef.current) return;

    if (modalRef.current.returnValue === "update") {
      const vals = getValues();
      await onUpdate(meeting.id, {
        title: vals.title,
        description: vals.description,
        start_date: new Date(vals.start_date),
        end_date: new Date(vals.end_date),
        attendees: vals.attendees || [],
      });
    }

    // Clear form
    reset();

    setLoading(false);
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
          <h1 className="text-blue-600 font-semibold text-2xl">
            Update <span className="italic">{meeting.title}</span>
          </h1>

          <Input
            id="title"
            label="Meeting name"
            icon={<Edit3 className="w-5 h-5" />}
            error={errors.title?.message}
            {...register("title", { required: "Meeting name is required" })}
          />

          <div className="grid lg:grid-cols-2 lg:gap-4">
            <Input
              id="start_date"
              label="Start date"
              type="datetime-local"
              icon={<Calendar className="w-5 h-5" />}
              error={errors.start_date?.message}
              min={dateForInput(now)}
              {...register("start_date", {
                valueAsDate: true,
                required: "Start date is required",
                validate: (value) =>
                  isAfter(new Date(value), now) ||
                  "Start date can't be in the past.",
                onChange: () => trigger(), // Trigger every field validation when to force end_date validation and re-render
              })}
            />

            <Input
              id="end_date"
              label="End date"
              type="datetime-local"
              icon={<Calendar className="w-5 h-5" />}
              error={errors.end_date?.message}
              min={dateForInput(
                startDate == "Invalid Date"
                  ? now
                  : addMinutes(new Date(startDate), END_DATE_LIMIT)
              )}
              {...register("end_date", {
                valueAsDate: true,
                required: "End date is required.",
                validate: (value) =>
                  isBefore(new Date(startDate), new Date(value)) ||
                  "End date must be after start date.",
              })}
            />
          </div>

          <div className="flex flex-row gap-4 w-full">
            <InputTags
              id="attendees"
              label="Attendees"
              icon={<Pencil className="w-5 h-5" />}
              placeholder="Enter attendees emails, separated by a comma."
              className="w-full"
              error={errors.attendees?.message}
              value={watch("attendees")}
              onChange={(emails: string[]) => {
                setValue("attendees", emails, { shouldValidate: true });
              }}
            />
          </div>

          <Textarea
            id="description"
            label="Description"
            error={errors.description?.message}
            {...register("description")}
          />
          <button
            id="close"
            aria-label="close"
            formNoValidate
            className="absolute top-8 right-8 btn p-2 rounded-full hover:bg-gray-400 hover:bg-opacity-20"
          >
            <X className="text-gray-700" />
          </button>

          <menu className="flex flex-col md:flex-row-reverse gap-3">
            <Button
              className="btn btn-primary"
              value="update"
              disabled={!isValid || loading}
              icon={loading ? Loader2 : undefined}
              iconClassName="animate-spin"
            >
              Save
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
