import { createMeeting } from "@/api/meetings";
import { Button } from "@/components/base/button/button";
import { Input } from "@/components/form/input/input";
import { Textarea } from "@/components/form/textarea/textarea";
import classNames from "classnames";
import { isAfter } from "date-fns";
import { Edit3, Calendar, Pencil, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormInputs {
  title: string;
  start_date: string;
  end_date: string;
  attendees: string;
  description: string;
}

interface MeetingCreateFormProps {
  onFormCreated?: () => Promise<void> | void;
}

export function MeetingCreateForm({
  onFormCreated,
}: MeetingCreateFormProps): JSX.Element {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
    watch,
    trigger,
  } = useForm<FormInputs>({
    mode: "all",
  });
  const [loading, setLoading] = useState(false);
  const startDate = watch("start_date", "Invalid Date");
  const now = new Date();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setLoading(true);

    await createMeeting({
      ...data,
      start_date: new Date(data.start_date),
      end_date: new Date(data.end_date),
      attendees: data.attendees?.split(",") || [],
    });

    await onFormCreated?.();

    // Clear form
    reset();

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classNames({ loading })}>
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
          min={now.toISOString().slice(0, 16)}
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
          min={(startDate == "Invalid Date" ? now : new Date(startDate))
            .toISOString()
            .slice(0, 16)}
          {...register("end_date", {
            valueAsDate: true,
            required: "End date is required.",
            validate: (value) =>
              isAfter(new Date(value), new Date(startDate)) ||
              "End date must be after start date.",
          })}
        />
      </div>

      <div className="flex flex-row gap-4 w-full">
        <Input
          id="attendees"
          label="Attendees"
          type="email"
          icon={<Pencil className="w-5 h-5" />}
          multiple
          placeholder="Enter attendees emails, separated by a comma."
          className="w-full"
          error={errors.attendees?.message}
          {...register("attendees", {
            required: "There must be at least one attendee.",
          })}
        />
      </div>

      <Textarea
        id="description"
        label="Description"
        error={errors.description?.message}
        {...register("description")}
      />

      <div className="flex flex-row justify-end gap-2 pt-2">
        <Button
          className="btn btn-primary"
          disabled={!isValid || loading}
          icon={loading ? Loader2 : undefined}
          iconClassName="animate-spin"
        >
          Plan meeting
        </Button>
      </div>
    </form>
  );
}
