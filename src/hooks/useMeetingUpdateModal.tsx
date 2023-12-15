import { updateMeeting, getMeeting } from "@/api/meetings";
import { MeetingUpdateModal } from "@/components/meeting/MeetingUpdateModal";
import { Meeting } from "@/types/Meeting";
import { useCallback, useRef, useState } from "react";

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
        await updateMeeting(id, data);
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
