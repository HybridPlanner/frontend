import classNames from "classnames";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import { MeetingWaiting } from "@/components/meeting/MeetingWaiting";
import { MeetingJoin } from "@/components/meeting/MeetingJoin";
import { getMeeting } from "@/api/meetings";
import { Meeting } from "@/types/Meeting";
import { Loader2 } from "lucide-react";
import { ErrorComponent } from "@/components/ErrorComponent";
import { useParams } from "react-router-dom";
import { AxiosError, isAxiosError } from "axios";

export function MeetingPage({}): JSX.Element {
  const [meeting, setMeeting] = useState<Meeting | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useParams<{ id: string }>();

  const fetchMeeting = async () => {
    try {
      if (!router.id) throw new Error("No meeting id provided");

      const meetingId = parseInt(router.id);
      const meeting = await getMeeting(meetingId);
      setMeeting(meeting);
    } catch (error) {
      if (isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 404) {
          setError("Meeting not found");
        }
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occured");
      }
    }
  };

  useEffect(() => { fetchMeeting(); }, [router]);

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
      <MeetingWaiting meeting={meeting} />
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

      <div className="my-auto">{getContent()}</div>
    </div>
  );
}
