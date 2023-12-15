import { updateMeeting, getMeeting } from "@/api/meetings";
import { MeetingUpdateModal } from "@/components/meeting/MeetingUpdateModal";
import { Meeting, MeetingStatus } from "@/types/Meeting";
import { useCallback, useRef, useState } from "react";

/**
 * Custom hook for managing the meeting update modal.
 * @param options - The options for the hook.
 * @param options.updateCallback - The callback function to be called after a meeting is updated.
 * @returns An object containing the function to show the meeting update modal and the JSX element for the modal.
 */
export default function useMeetingUpdateModal({
  updateCallback,
}: {
  updateCallback?: () => void;
}) {
  const [modalMeeting, setModalMeeting] = useState<Meeting | undefined>(
    undefined
  );

  const updateMeetingModalRef = useRef<HTMLDialogElement>(null);

  const showMeetingUpdateModal = useCallback(
    async (meeting: Meeting) => {
      const meetingData = await getMeeting(meeting.id);
      console.debug("Update meeting %O", meeting);
      setModalMeeting(meetingData);
      updateMeetingModalRef.current?.showModal();
    },
    [updateMeetingModalRef]
  );

  const meetingUpdateModal = (
    <MeetingUpdateModal
      ref={updateMeetingModalRef}
      meeting={modalMeeting}
      onUpdate={async (id, data) => {
        if(modalMeeting?.status !== MeetingStatus.STARTED) {
          await updateMeeting(id, data);
        }

        if (updateCallback) {
          updateCallback();
        }
      }}
    />
  );
  
  return {
    showMeetingUpdateModal,
    meetingUpdateModal,
  };
}
