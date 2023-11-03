import { Meeting } from "@/types/Meeting";
import { MeetingDateBadge } from "./MeetingDateBadge";
import { Card } from "../card/card";
import { Link } from "react-router-dom";
import { Button } from "../base/button/button";
import { MeetingCountdown } from "./MeetingCountdown";

export function MeetingWaiting({ meeting }: { meeting: Meeting }): JSX.Element {
  return (
    <div className="flex max-lg:flex-col gap-8 max-lg:divide-y justify-center items-center">
      <div className="flex flex-col gap-3 justify-center items-center lg:basis-2/3">
        <p className="font-medium text-center text-sm opacity-80">
          You are invited to a meeting.
        </p>
        <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-center mb-2">
          {meeting.title}
        </h1>

        <MeetingDateBadge meeting={meeting} />

        <MeetingCountdown meeting={meeting} />

        <p className="text-sm text-slate-500 text-center">
          You will be automatically added to the meeting as
          <span className="font-medium"> invited@site.fr </span>
          when it will start
        </p>
      </div>

      <div className="flex flex-col gap-3 lg:basis-1/3 max-lg:pt-10 max-lg:items-center">
        <p className="text-indigo-900 font-medium text-center md:text-left">
          Don’t know HybridPlanner ?
        </p>
        <h3 className="text-blue-500 text-2xl md:text-3xl font-normal leading-tight break-words text-center md:text-left">
          Plan your next Raindow meeting easily with{" "}
          <span className="font-bold">Hybrid</span>Planner
        </h3>
        <p className="text-slate-500 text-center md:text-left">
          HybridPlanner let you plan meetings with external participants easily.
          It’s free.
        </p>
        <Link to="/dashboard">
          <Button>Try it now</Button>
        </Link>
      </div>
    </div>
  );
}
