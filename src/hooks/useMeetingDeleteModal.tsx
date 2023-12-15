import { deleteMeeting, getMeeting } from "@/api/meetings";
import { MeetingDeleteModal } from "@/components/meeting/MeetingDeleteModal";
import { Meeting } from "@/types/Meeting";
import { useCallback, useRef, useState } from "react";

/**
 * Custom hook for managing the meeting delete modal.
 * @param deleteCallback - Optional callback function to be executed after a meeting is deleted.
 * @returns An object containing the function to show the meeting delete modal and the JSX element for the modal.
 */
export default function useMeetingDeleteModal({
  deleteCallback,
}: {
  deleteCallback?: () => void;
}) {
  const [modalMeeting, setModalMeeting] = useState<Meeting | undefined>(
    undefined
  );

  const deleteMeetingModalRef = useRef<HTMLDialogElement>(null);

  /**
   * Show the deletion modal of the meeting.
   * 
   * @param meeting The meeting to delete.
   */
  const showMeetingDeleteModal = useCallback(
    async (meeting: Meeting) => {
      const meetingData = await getMeeting(meeting.id);
      console.debug("Delete meeting %O", meeting);
      setModalMeeting(meetingData);
      deleteMeetingModalRef.current?.showModal();
    },
    [deleteMeetingModalRef]
  );

  const meetingDeleteModal = modalMeeting && (
    <MeetingDeleteModal
      ref={deleteMeetingModalRef}
      meeting={modalMeeting}
      onDelete={async (meeting) => {
        await deleteMeeting(meeting.id);
        if (deleteCallback) {
          deleteCallback();
        }
      }}
    />
  );

  return {
    showMeetingDeleteModal,
    meetingDeleteModal,
  };
}
