export interface Meeting {
  id: number;
  title: string;
  description?: string;
  start_date: Date;
  end_date: Date;
  attendees: { id: number; email: string }[];
  publicUrl?: string;
}

export interface CreateMeetingInput {
  title: string;
  description?: string;
  start_date: Date;
  end_date: Date;
  attendees: string[];
}

export type MeetingEvent =
  | { type: 'bubbleCreated'; id: number; meeting: Meeting }
  | { type: 'updated'; id: number; meeting: Meeting }
  | { type: 'cancelled'; id: number }
  | { type: 'started'; id: number; url: string };