import { Card } from "@/components/card/card";
import Navbar from "../Navbar";
import { Calendar, ChevronDown, Loader2, Plus } from "lucide-react";
import { addDays, isBefore, isEqual } from "date-fns";
import { setTime, sortMeetings } from "@/utils/date";
import { MeetingCard } from "@/components/meeting/MeetingCard";
import { Meeting } from "@/types/Meeting";
import { MeetingCreateForm } from "./CreateForm";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import {
  deleteMeeting,
  getFutureMeetings,
  getPreviousMeetings,
} from "@/api/meetings";
import "./dashboard.css";
import { MeetingInfoModal } from "@/components/meeting/MeetingInfoModal";
import { MeetingDeleteModal } from "@/components/meeting/MeetingDeleteModal";

export function MeetingsDashboard(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Meeting[] | undefined>(undefined);
  const [previousData, setPreviousData] = useState<Meeting[] | undefined>(
    undefined
  );
  const [error, setError] = useState<string | undefined>(undefined);

  const [modalMeeting, setModalMeeting] = useState<Meeting | undefined>(
    undefined
  );
  const showMeetingModalRef = useRef<HTMLDialogElement>(null);
  const deleteMeetingModalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    let timeout: number;
    if (!(data instanceof Array) && error === undefined) {
      timeout = window.setTimeout(() => {
        setError("Something went wrong");
      }, 5000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [data, error]);

  const fetchFutureMeetings = async () => {
    console.debug("Fetching future meetings");
    setLoading(true);
    try {
      const meetings = await getFutureMeetings();
      console.debug("Future meeting fetched: %d", meetings.length);

      sortMeetings(meetings);
      setData(meetings);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchPreviousMeetings = async () => {
    console.debug("Fetching previous meetings");
    setLoading(true);
    try {
      let previous_date: Date;
      if (!previousData) {
        console.debug("No previous meeting, fetching until now");
        previous_date = new Date();
      } else {
        const last = previousData[previousData?.length - 1];
        previous_date = last.start_date;
      }

      const meetings = await getPreviousMeetings(previous_date);
      sortMeetings(meetings);
      console.debug(
        "Previous meeting fetched until %O: %d",
        previous_date,
        meetings.length
      );
      setPreviousData([...(previousData ?? []), ...meetings]);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFutureMeetings();
  }, []);

  const updateList = async () => {
    setData(undefined);
    await fetchFutureMeetings();
  };

  const showMeetingModal = (
    meeting: Meeting,
    action: "show" | "edit" | "delete"
  ) => {
    if (action === "show") {
      console.debug("Show meeting %O", meeting);
      setModalMeeting(meeting);
      showMeetingModalRef.current?.showModal();
    } else if (action === "delete") {
      console.debug("Delete meeting %O", meeting);
      setModalMeeting(meeting);
      deleteMeetingModalRef.current?.showModal();
    }
  };

  return (
    <div
      className={classNames(
        "container px-4 mx-auto flex flex-col gap-3 min-h-screen"
      )}
    >
      <Navbar />

      <div className="my-auto mx-6 py-8 flex flex-col xl:flex-row gap-16">
        <div className="flex-1">
          <header>
            <h1 className="font-bold text-5xl mb-4">Hey Louis 👋</h1>
            <p>Here are your upcoming meetings.</p>
          </header>

          {data !== undefined ? (
            <Card
              icon={<Calendar />}
              cardTitle="Upcoming Meetings"
              withoutBackground={true}
              className="xl:pr-24"
            >
              <div className="flex flex-col gap-4">
                {data.length === 0 && (
                  <div className="text-center p-8">
                    <p className="text-gray-500">
                      There are no meetings planned for now...
                    </p>
                  </div>
                )}

                {data.length > 0 && (
                  <>
                    <h2 className="uppercase text-blue-600">
                      Planned meetings
                    </h2>
                    {data.map((meeting) => (
                      <MeetingCard
                        className="odd:bg-blue-50 even:bg-gray-50"
                        meeting={meeting}
                        onOpenMeeting={(m) => showMeetingModal(m, "show")}
                        onDeleteMeeting={(m) => showMeetingModal(m, "delete")}
                        key={meeting.id}
                      />
                    ))}
                  </>
                )}

                {previousData && previousData.length > 0 && (
                  <>
                    <div className="border-b border-gray-300 mt-4"></div>

                    <h2 className="uppercase text-blue-600">Past meetings</h2>

                    {previousData.map((meeting) => (
                      <MeetingCard
                        className="odd:bg-blue-50 even:bg-gray-50"
                        meeting={meeting}
                        isPrevious={true}
                        onOpenMeeting={(m) => showMeetingModal(m, "show")}
                        key={meeting.id}
                      />
                    ))}
                  </>
                )}

                <div className="relative text-center py-4">
                  <button
                    type="button"
                    disabled={loading}
                    className={classNames(
                      loading
                        ? "text-blue-400"
                        : "text-blue-700 hover:text-blue-500",
                      "transition-colors duration-100 font-semibold inline-flex gap-2 items-end"
                    )}
                    onClick={fetchPreviousMeetings}
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
          ) : !error ? (
            <div className="flex flex-col items-center justify-center p-8 text-blue-500 gap-2">
              <Loader2 className="w-8 h-8 animate-spin mx-auto" />
              <p className="text-lg font-semibold">Loading</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-red-500 gap-2">
              <p className="text-lg font-semibold">{error}</p>
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => {
                  setError(undefined);
                  setData(undefined);
                  fetchFutureMeetings();
                }}
              >
                Retry
              </button>
            </div>
          )}

          <MeetingInfoModal ref={showMeetingModalRef} meeting={modalMeeting} />
          <MeetingDeleteModal
            ref={deleteMeetingModalRef}
            meeting={modalMeeting}
            onDelete={async (meeting) => {
              await deleteMeeting(meeting.id);
              await fetchFutureMeetings();
            }}
          />
        </div>

        <div className="flex-1 relative">
          <Card icon={<Plus />} cardTitle="Plan a meeting" className="h-full">
            <MeetingCreateForm onFormCreated={updateList} />
            <div className="colored-background"></div>
          </Card>
        </div>
      </div>
    </div>
  );
}
