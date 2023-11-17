import { Meeting } from "@/types/Meeting";
import { Card } from "../card/card";
import Countdown from "react-countdown";
import { Button } from "../base/button/button";

const labels = ["days", "hours", "minutes", "seconds"];

export function MeetingCountdown({
  meeting,
}: {
  meeting: Meeting;
}): JSX.Element {
  return (
    <Card className="my-5 xl:my-8 !py-3 shadow-xl w-full max-w-md">
      <div className="flex flex-col justify-center gap-4">
        <Countdown
          date={meeting.start_date}
          renderer={({ days, hours, minutes, seconds, completed }) => {
            if (completed) {
              return (
                <>
                  <p className="text-lg text-slate-500 text-center">
                    Meeting started !
                  </p>
                  <Button>Join meeting</Button>
                </>
              );
            } else {
              return (
                <>
                  <p className="text-lg text-slate-500 text-center">
                    Starting in
                  </p>
                  <div className="flex items-center justify-around">
                    {[days, hours, minutes, seconds].map((value, index) => {
                      if (index > 0 || value > 0) {
                        return (
                          <CountdownValue key={index} value={value} label={labels[index]} />
                        );
                      }
                    })}
                  </div>
                </>
              );
            }
          }}
        />
      </div>
    </Card>
  );
}

function CountdownValue({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <span className="text-4xl xl:text-6xl text-blue-500">{value < 10 ? `0${value}` : value}</span>
      <span className="text-sm text-gray-500">{label}</span>
    </div>
  );
}
