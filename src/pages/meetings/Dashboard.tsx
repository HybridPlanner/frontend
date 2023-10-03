import { Card } from "@/components/card/card";
import Navbar from "../Navbar";
import { Calendar, ChevronDown, Edit3, Pencil, Plus } from "lucide-react";
import classNames from "classnames";
import {
  addDays,
  format,
  formatRelative,
  isAfter,
  isToday,
  isTomorrow,
} from "date-fns";
import { Input } from "@/components/form/input/input";
import { Textarea } from "@/components/form/textarea/textarea";
import { Button } from "@/components/base/button/button";

interface Meeting {
  start_date: Date;
  end_date: Date;
  name: string;
  invitees: string[];
}

function setTime(date: Date, hours: number, minutes: number): Date {
  date.setHours(hours);
  date.setMinutes(minutes);
  return date;
}

function formatDate(start: Date, end: Date): string {
  let startFormat = "";
  let endFormat = "";

  if (isToday(start)) {
    startFormat += "Today from ";
  } else if (isTomorrow(start)) {
    startFormat += "Tomorrow from ";
  } else {
    startFormat += `${format(start, "EEEE d")} from `;
  }

  if (
    isToday(end) ||
    isTomorrow(end) ||
    format(start, "d") === format(end, "d")
  ) {
    endFormat += format(end, "HH:mm");
  } else {
    endFormat += `${format(end, "EEEE d")} at ${format(end, "HH:mm")}`;
  }

  startFormat += format(start, "HH:mm") + " to " + endFormat;

  return startFormat;
}

export function MeetingsDashboard(): JSX.Element {
  const now = new Date();
  const tomorrow = addDays(now, 1);

  const meetings: Meeting[] = [
    {
      start_date: setTime(now, 10, 30),
      end_date: setTime(now, 11, 30),
      name: "Operational team meeting",
      invitees: ["Louis", "John", "Jane"],
    },
    {
      start_date: setTime(tomorrow, 16, 15),
      end_date: setTime(tomorrow, 16, 30),
      name: "Sprint planning 2023",
      invitees: ["Louis", "John", "Jane"],
    },
  ];

  return (
    <div className="container px-4 mx-auto flex flex-col gap-3">
      <Navbar />

      <div className="mt-28 mx-6 flex flex-col xl:flex-row gap-8">
        <div className="flex-1">
          <header className="">
            <h1 className="font-bold text-3xl mb-4">Hey Louis 👋</h1>
            <p>Here are your upcoming meetings.</p>
          </header>
          <Card
            icon={<Calendar />}
            title="Upcoming Meetings"
            withoutBackground={true}
          >
            <div className="flex flex-col gap-4">
              {meetings.map((meeting) => (
                <div
                  className={classNames(
                    "grid grid-cols-[auto_1fr] gap-x-4 grid-row-3 p-4 rounded-xl",
                    "odd:bg-blue-50 even:bg-gray-50 px-4"
                  )}
                  key={meeting.start_date + "|" + meeting.end_date}
                >
                  <div className="rounded-xl overflow-hidden flex flex-col bg-white shadow-md row-span-full">
                    <span className="bg-red-500 px-2 pt-0.5 text-[0.7rem] text-white leading-4">
                      {format(meeting.start_date, "LLL.").toUpperCase()}
                    </span>
                    <span className="text-gray-900 font-bold text-xl px-2 py-1 leading-4 text-center">
                      {meeting.start_date.getDay()}
                    </span>
                  </div>
                  <div className="col-span-full col-start-2 text-lg font-semibold leading-6 tracking-wide">
                    {meeting.name}
                  </div>
                  <div className="col-span-full col-start-2">
                    <span
                      className={classNames(
                        'before:content-[""] before:rounded-full before:w-2 before:h-2',
                        "bg-blue-100 px-2 py-1 rounded-full text-blue-700"
                      )}
                    >
                      {formatDate(meeting.start_date, meeting.end_date)}
                    </span>
                  </div>
                  <div className="col-span-full col-start-2"></div>
                </div>
              ))}

              <div className="relative text-center py-4">
                <button
                  type="button"
                  className="text-blue-700 hover:text-blue-500 transition-colors duration-100 ease-in-out font-semibold inline-flex gap-2 items-center"
                >
                  Show past meetings
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex-1 relative">
          <Card icon={<Plus />} title="Plan a meeting" className="h-full">
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

              <Textarea
                id="description"
                name="description"
                label="Description"
              />

              <div className="flex flex-row justify-end gap-2 pt-2">
                <Button className="btn btn-primary">Plan meeting</Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
