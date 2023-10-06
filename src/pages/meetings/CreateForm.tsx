import { Button } from "@/components/base/button/button";
import { Input } from "@/components/form/input/input";
import { Textarea } from "@/components/form/textarea/textarea";
import { Edit3, Calendar, Pencil } from "lucide-react";

export function MeetingCreateForm(): JSX.Element {
  return (
    <form>
      <Input
        id="name"
        name="name"
        label="Meeting name"
        icon={<Edit3 className="w-5 h-5" />}
      />

      <div className="flex flex-row gap-4">
        <Input
          id="start_date"
          name="start_date"
          label="Start date"
          type="datetime-local"
          icon={<Calendar className="w-5 h-5" />}
        />

        <Input
          id="end_date"
          name="end_date"
          label="End date"
          type="datetime-local"
          icon={<Calendar className="w-5 h-5" />}
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

      <Textarea id="description" name="description" label="Description" />

      <div className="flex flex-row justify-end gap-2 pt-2">
        <Button className="btn btn-primary">Plan meeting</Button>
      </div>
    </form>
  );
}
