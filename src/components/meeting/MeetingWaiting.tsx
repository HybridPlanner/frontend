import { Meeting } from "@/types/Meeting";
import { MeetingDateBadge } from "./MeetingDateBadge";
import { Card } from "../card/card";
import { Link } from "react-router-dom";
import { Button } from "../base/button/button";

export function MeetingWaiting({ meeting }: { meeting: Meeting }): JSX.Element {
  return (
    <div className="grid grid-cols-2 gap-2 justify-center items-center">
      <div className="flex flex-col gap-3 justify-center items-center">
        <p className="font-medium text-center text-sm">
          You are invited to a meeting.
        </p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-center mb-2">
          {meeting.title}
        </h1>
        <MeetingDateBadge meeting={meeting} />

        <p className="text-sm text-slate-500">
          You will be automatically added to the meeting as
          <span className="font-medium"> invited@site.fr </span>
          when it will start
        </p>
      </div>

      <Card>
        <div className="flex flex-col gap-3">
          <p className="text-indigo-900 font-medium">
            Don’t know HybridPlanner ?
          </p>
          <h3 className="text-blue-500 text-2xl md:text-3xl font-normal leading-tight break-words">
            Plan your next Raindow meeting easily with{" "}
            <span className="font-bold">Hybrid</span>Planner
          </h3>
          <p className="text-slate-500">
            HybridPlanner let you plan meetings with external participants
            easily. It’s free.
          </p>
          <Link to="/dashboard">
            <Button>Try it now</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
