import classNames from "classnames";
import Navbar from "../Navbar";
import { useCallback, useEffect, useState } from "react";
import { MeetingWaiting } from "@/components/meeting/MeetingWaiting";
import { MeetingJoin } from "@/components/meeting/MeetingJoin";
import { getMeeting } from "@/api/meetings";
import { Meeting, MeetingEvent  } from "@/types/Meeting";
import { Loader2 } from "lucide-react";
import { ErrorComponent } from "@/components/ErrorComponent";
import { redirect, useParams } from "react-router-dom";
import { AxiosError, isAxiosError } from "axios";

export function MeetingPage({}): JSX.Element {
  const [meeting, setMeeting] = useState<Meeting | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useParams<{ id: string }>();

  const fetchMeeting = useCallback(async () => {
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
  }, []);

  const listenEvents = useCallback(() => {
    console.log("Listening events");
    if (!router.id) throw new Error("No meeting id provided");

    const meetingId = parseInt(router.id);
    const eventSource = new EventSource(`/api/meetings/${meetingId}/events`);

    eventSource.onmessage = (event) => {
      console.log("Event received", event);
      const data = JSON.parse(event.data) as MeetingEvent;
      console.log("Event data", data);
      switch (data.type) {
          case 'cancelled':
            if (data.id !== meetingId)  return;
            setError("Meeting cancelled");
            break;
          case 'started':
            console.log("Meeting started", data.id, meetingId);
            if (data.id !== meetingId)  return;
            window.location.href = data.url
            break;
          case 'updated':
            if (data.id !== meetingId)  return;
            setMeeting(JSON.parse(event.data));
            break;
      }
    };

    return () => {
      console.log("Closing event source");
      eventSource.close();
    }
  }, [router]);

  useEffect(() => {
    fetchMeeting();
    listenEvents();
  }, [router, listenEvents, fetchMeeting]);

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
