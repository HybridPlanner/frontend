export interface Meeting {
  id: number;
  title: string;
  description: string;
  start_date: Date;
  end_date: Date;
  attendees: string[];
}

export interface CreateMeetingInput {
  title: string;
  description?: string;
  start_date: Date;
  end_date: Date;
  attendees: string[];
}