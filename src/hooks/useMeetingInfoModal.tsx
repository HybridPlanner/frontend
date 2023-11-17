import { getMeeting } from "@/api/meetings";
import { MeetingInfoModal } from "@/components/meeting/MeetingInfoModal";
import { Meeting } from "@/types/Meeting";
import { useCallback, useRef, useState } from "react";

export default function useMeetingInfoModal() {
  const [modalMeeting, setModalMeeting] = useState<Meeting | undefined>(
    undefined
  );

  const showMeetingModalRef = useRef<HTMLDialogElement>(null);

  const showMeetingInfoModal = useCallback(
    async (meeting: Meeting) => {
      const meetingData = await getMeeting(meeting.id);
      // Fetch meeting data
      console.debug("Show meeting %O", meetingData);
      setModalMeeting(meetingData);
      showMeetingModalRef.current?.showModal();
    },
    [setModalMeeting, showMeetingModalRef]
  );

  const meetingInfoModal = (
    <MeetingInfoModal ref={showMeetingModalRef} meeting={modalMeeting} />
  );

  return {
    showMeetingInfoModal,
    meetingInfoModal,
  };
}
