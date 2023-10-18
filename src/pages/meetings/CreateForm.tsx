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
  } = useForm<FormInputs>({
    mode: "all",
  });
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setLoading(true);

    await createMeeting({
      title: data.title,
      description: data.description,
      start_date: new Date(data.start_date),
      end_date: new Date(data.end_date),
      attendees: [],
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

      <div className="flex flex-row gap-4">
        <Input
          id="start_date"
          label="Start date"
          type="datetime-local"
          icon={<Calendar className="w-5 h-5" />}
          error={errors.start_date?.message}
          min={new Date().toISOString().slice(0, 16)}
          {...register("start_date", {
            valueAsDate: true,
            required: "Start date is required",
            validate: {
              date: (value) => {
                try {
                  const startDate = new Date(value);
                  if (!isAfter(startDate, new Date())) {
                    return "Start date can't be in the past";
                  }
                } catch (error) {}
                return true;
              },
            },
          })}
        />

        <Input
          id="end_date"
          label="End date"
          type="datetime-local"
          icon={<Calendar className="w-5 h-5" />}
          error={errors.end_date?.message}
          min={watch("start_date")}
          {...register("end_date", {
            valueAsDate: true,
            required: "End date is required",
            validate: {
              date: (value) => {
                try {
                  const startDate = new Date(watch("start_date"));
                  const endDate = new Date(value);
                  if (!isAfter(endDate, startDate)) {
                    return "End date must be after start date";
                  }
                } catch (error) {}
                return true;
              },
            },
          })}
        />
      </div>

      <div className="flex flex-row gap-4 w-full">
        <Input
          id="invitees"
          name="invitees"
          label="Invitees"
          icon={<Pencil className="w-5 h-5" />}
          className="w-full"
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
