import { Tag } from "react-tag-autocomplete";

export interface Meeting {
  id: number;
  title: string;
  description?: string;
  start_date: Date;
  end_date: Date;
  attendees: { id: number; email: string }[];
  publicUrl?: string;
  started: boolean;
  status?: MeetingStatus;
}

interface CreateMeeting {
  title: string;
  description?: string;
  start_date: Date;
  end_date: Date;
}

export interface CreateMeetingInput extends CreateMeeting {
  attendees: string[]
}

export interface CreateMeetingPayload extends CreateMeeting {
  attendees: string[];
}

export type MeetingEvent =
  | { type: 'bubbleCreated'; id: number; meeting: Meeting }
  | { type: 'updated'; id: number; meeting: Meeting }
  | { type: 'cancelled'; id: number }
  | { type: 'started'; id: number; url: string };

export enum MeetingStatus {
  SCHEDULED = 'scheduled',
  STARTED = 'started',
  FINISHED = 'finished',
}