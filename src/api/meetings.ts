import { CreateMeetingInput, Meeting } from "@/types/Meeting";
import { apiClient } from ".";

export async function getFutureMeetings(): Promise<Meeting[]> {
  const response = await apiClient.get<{ meetings: Meeting[] }>("/meetings");

  return response.data.meetings.map((meeting) => ({
    ...meeting,
    start_date: new Date(meeting.start_date),
    end_date: new Date(meeting.end_date),
  }));
}

export async function getPreviousMeetings(before: Date): Promise<Meeting[]> {
  const response = await apiClient.get<{ meetings: Meeting[] }>(
    `/meetings?before=${before.getTime()}`
  );
  return response.data.meetings.map((meeting) => ({
    ...meeting,
    start_date: new Date(meeting.start_date),
    end_date: new Date(meeting.end_date),
  }));
}

export async function createMeeting(
  data: CreateMeetingInput
): Promise<Meeting> {
  const response = await apiClient.post<Meeting>("/meetings", {
    ...data,
    start_date: data.start_date.getTime(),
    end_date: data.end_date.getTime(),
  });
  return response.data;
}

export async function deleteMeeting(id: string): Promise<void> {
  await apiClient.delete(`/meetings/${id}`);
}

export async function getMeeting(id: string): Promise<Meeting> {
  const response = await apiClient.get<Meeting>(`/meetings/${id}`);
  
  response.data.start_date = new Date(response.data.start_date);
  response.data.end_date = new Date(response.data.end_date);

  return response.data;
}

export async function updateMeeting(
  id: string,
  data: Partial<CreateMeetingInput>
): Promise<Meeting> {
  const response = await apiClient.patch<Meeting>(`/meetings/${id}`, data);
  return response.data;
}