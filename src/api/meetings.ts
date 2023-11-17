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
    `/meetings?before=${before.toISOString()}`
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
  const response = await apiClient.post<Meeting>("/meetings", data);
  return response.data;
}

export async function deleteMeeting(id: number): Promise<void> {
  await apiClient.delete(`/meetings/${id}`);
}

export async function getMeeting(id: number): Promise<Meeting> {
  const response = await apiClient.get<Meeting>(`/meetings/${id}`);

  if (!response.data || !response.data.id) throw new Error("Invalid data");

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
