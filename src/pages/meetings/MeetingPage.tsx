import classNames from "classnames";
import Navbar from "../Navbar";
import { useCallback, useEffect, useState } from "react";
import { MeetingWaiting } from "@/components/meeting/MeetingWaiting";
import { MeetingJoin } from "@/components/meeting/MeetingJoin";
import { getMeeting } from "@/api/meetings";
import { Meeting, MeetingEvent  } from "@/types/Meeting";
import { Loader2 } from "lucide-react";
import { ErrorComponent } from "@/components/ErrorComponent";
import { useParams } from "react-router-dom";
import { AxiosError, isAxiosError } from "axios";
import { isBefore } from "date-fns";

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

      // If we're after the meeting end
      if (meeting.publicUrl && isBefore(meeting.end_date, new Date())) { 
        // Just show an error message
        setError("Sorry, you're too late! The meeting has already ended.");
      } else if (meeting.publicUrl && isBefore(meeting.start_date, new Date())) {
        // If the meeting already started, redirect to the meeting
        window.location.href = meeting.publicUrl;
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 404) {
          setError("Meeting not found");
        }
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  }, []);

  const listenEvents = useCallback(() => {
    console.log("Listening events");
    if (!router.id) throw new Error("No meeting id provided");

    const meetingId = parseInt(router.id);
    const eventSource = new EventSource(`/api/meetings/${meetingId}/events`);

    eventSource.onmessage = (event) => {
      /**
       * Handles the event received from the server.
       * @param event - The event received from the server.
       */
      console.log("Event received", event);
      const data = JSON.parse(event.data) as MeetingEvent;
      console.log("Event data", data);
      switch (data.type) {
        /**
         * Handles the case when the meeting is cancelled.
         */
        case 'cancelled':
          if (data.id !== meetingId)  return;
          setError("Meeting cancelled");
          break;
        /**
         * Handles the case when the meeting is started.
         */
        case 'started':
          console.log("Meeting started", data.id, meetingId);
          if (data.id !== meetingId)  return;
          window.location.href = data.url
          break;
        /**
         * Handles the case when the meeting is updated.
         */
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

  /**
   * Executes the fetchMeeting and listenEvents functions when the component mounts.
   * @returns {void}
   */
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
