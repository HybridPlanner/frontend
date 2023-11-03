import classNames from "classnames";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import { MeetingWaiting } from "@/components/meeting/MeetingWaiting";
import { MeetingJoin } from "@/components/meeting/MeetingJoin";
import { getMeeting } from "@/api/meetings";
import { Meeting } from "@/types/Meeting";
import { Loader2 } from "lucide-react";
import { ErrorComponent } from "@/components/ErrorComponent";

export function MeetingPage({}): JSX.Element {
  const [meeting, setMeeting] = useState<Meeting | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    const fetchMeeting = async () => {
      const meetingId = +window.location.pathname.split("/")[2];

      try {
        const meeting = await getMeeting(meetingId);
        console.log("get meeting", meeting);
        setMeeting(meeting);
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchMeeting();
  }, []);

  const getContent = () => {
    if (error) {
      return <ErrorComponent error={error} />;
    }

    if (!meeting) {
      return (
        <div className="my-5 flex justify-center items-center">
          <Loader2 className="w-5 h-5 animate-spin" />
        </div>
      );
    }

    return meeting.start_date > new Date() ? (
      <MeetingWaiting />
    ) : (
      <MeetingJoin />
    );
  };

  return (
    <div
      className={classNames(
        "container px-4 mx-auto flex flex-col gap-3 min-h-screen"
      )}
    >
      <Navbar />

      {getContent()}
    </div>
  );
}
