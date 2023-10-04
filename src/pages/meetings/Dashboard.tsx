import { Card } from "@/components/card/card";
import Navbar from "../Navbar";
import { Calendar, ChevronDown, Loader2, Plus } from "lucide-react";
import { addDays } from "date-fns";
import { setTime } from "@/utils/date";
import { MeetingCard } from "@/components/meeting/MeetingCard";
import { Meeting } from "@/types/Meeting";
import { MeetingCreateForm } from "./CreateForm";
import { useState } from "react";
import classNames from "classnames";

export function MeetingsDashboard(): JSX.Element {
  const [loading, setLoading] = useState(false);

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
                <MeetingCard
                  className="odd:bg-blue-50 even:bg-gray-50"
                  meeting={meeting}
                  key={meeting.start_date + "|" + meeting.end_date}
                />
              ))}

              <div className="relative text-center py-4">
                <button
                  type="button"
                  disabled={loading}
                  className={classNames(
                    loading
                      ? "text-blue-400"
                      : "text-blue-700 hover:text-blue-500",
                    "transition-colors duration-100 ease-in-out font-semibold inline-flex gap-2 items-end"
                  )}
                >
                  Show past meetings
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex-1 relative">
          <Card icon={<Plus />} title="Plan a meeting" className="h-full">
            <MeetingCreateForm />
          </Card>
        </div>
      </div>
    </div>
  );
}
