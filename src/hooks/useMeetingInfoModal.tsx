import { getMeeting } from "@/api/meetings";
import { MeetingInfoModal } from "@/components/meeting/MeetingInfoModal";
import { Meeting } from "@/types/Meeting";
import { useCallback, useRef, useState } from "react";

/**
 * Custom hook for managing the meeting info modal.
 * This hook provides functions and state variables to show and manage the meeting info modal.
 *
 * @returns An object containing the following properties:
 *   - showMeetingInfoModal: A function to show the meeting info modal for a specific meeting.
 *   - meetingInfoModal: The JSX element representing the meeting info modal.
 */
export default function useMeetingInfoModal() {
  // State variable to store the currently selected meeting
  const [modalMeeting, setModalMeeting] = useState<Meeting | undefined>(
    undefined
  );

  // Ref to the dialog element used to show the meeting info modal
  const showMeetingModalRef = useRef<HTMLDialogElement>(null);

  // Function to show the meeting info modal for a specific meeting
  const showMeetingInfoModal = useCallback(
    async (meeting: Meeting) => {
      // Fetch meeting data
      const meetingData = await getMeeting(meeting.id);
      console.debug("Show meeting %O", meetingData);
      setModalMeeting(meetingData);
      showMeetingModalRef.current?.showModal();
    },
    [setModalMeeting, showMeetingModalRef]
  );

  // JSX element representing the meeting info modal
  const meetingInfoModal = (
    <MeetingInfoModal ref={showMeetingModalRef} meeting={modalMeeting} />
  );

  return {
    showMeetingInfoModal,
    meetingInfoModal,
  };
}
