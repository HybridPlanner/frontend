import { Card } from "@/components/card/card";
import Navbar from "../Navbar";
import { Calendar, ChevronDown, Loader2, Plus } from "lucide-react";
import { MeetingCard } from "@/components/meeting/MeetingCard";
import { MeetingCreateForm } from "./CreateForm";
import classNames from "classnames";
import "./dashboard.css";
import useMeetingInfoModal from "@/hooks/useMeetingInfoModal";
import useMeetingDeleteModal from "@/hooks/useMeetingDeleteModal";
import useFetchMeetings from "@/hooks/useFetchMeetings";
import useMeetingUpdateModal from "@/hooks/useMeetingUpdateModal";

export function MeetingsDashboard(): JSX.Element {
  const {
    fetchPreviousMeetings,
    refreshMeetingList,
    data,
    previousData,
    loading,
    error,
  } = useFetchMeetings();

  const { showMeetingInfoModal, meetingInfoModal } = useMeetingInfoModal();
  const { showMeetingUpdateModal, meetingUpdateModal } = useMeetingUpdateModal({
    updateCallback: refreshMeetingList,
  });
  const { showMeetingDeleteModal, meetingDeleteModal } = useMeetingDeleteModal({
    deleteCallback: refreshMeetingList,
  });

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
            <h1 className="font-bold text-5xl mb-4 tracking-tight">Hey 👋</h1>
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
                    {data.map((meeting) => (
                      <MeetingCard
                        className="odd:bg-blue-50/20 even:bg-gray-50/20"
                        meeting={meeting}
                        onOpenMeeting={(m) => showMeetingInfoModal(m)}
                        onDeleteMeeting={(m) => showMeetingDeleteModal(m)}
                        onEditMeeting={(m) => showMeetingUpdateModal(m)}
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
                        onOpenMeeting={(m) => showMeetingInfoModal(m)}
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
                onClick={refreshMeetingList}
              >
                Retry
              </button>
            </div>
          )}

          {meetingInfoModal}
          {meetingDeleteModal}
          {meetingUpdateModal}
        </div>

        <div className="flex-1 relative">
          <Card icon={<Plus />} cardTitle="Plan a meeting" className="h-full">
            <MeetingCreateForm onFormCreated={refreshMeetingList} />
            <div className="colored-background"></div>
          </Card>
        </div>
      </div>
    </div>
  );
}
