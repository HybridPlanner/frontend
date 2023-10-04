export interface Meeting {
  id: number;
  name: string;
  start_date: Date;
  end_date: Date;
  invitees: string[];
}

export interface CreateMeetingInput {
  name: string;
  start_date: Date;
  end_date: Date;
  invitees: string[];
}