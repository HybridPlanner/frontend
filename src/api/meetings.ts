import { CreateMeetingInput, CreateMeetingPayload, Meeting } from "@/types/Meeting";
import { apiClient } from ".";

/**
 * Retrieves future meetings from the server.
 * @returns An array of Meeting objects representing future meetings.
 */
export async function getFutureMeetings(): Promise<Meeting[]> {
  const response = await apiClient.get<{ meetings: Meeting[] }>("/meetings");

  return response.data.meetings.map((meeting) => ({
    ...meeting,
    start_date: new Date(meeting.start_date),
    end_date: new Date(meeting.end_date),
  }));
}

/**
 * Retrieves previous meetings from the server that occurred before the specified date.
 * @param before The date before which the meetings should have occurred.
 * @returns An array of Meeting objects representing previous meetings.
 */
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

/**
 * Creates a new meeting on the server.
 * @param data The input data for creating the meeting.
 * @returns The created Meeting object.
 */
export async function createMeeting(
  data: CreateMeetingPayload
): Promise<Meeting> {
  const response = await apiClient.post<Meeting>("/meetings", data);
  return response.data;
}

/**
 * Deletes a meeting from the server.
 * @param id The ID of the meeting to delete.
 * @returns A promise that resolves when the meeting is successfully deleted.
 */
export async function deleteMeeting(id: number): Promise<void> {
  await apiClient.delete(`/meetings/${id}`);
}

/**
 * Retrieves a specific meeting from the server.
 * @param id The ID of the meeting to retrieve.
 * @returns The Meeting object representing the retrieved meeting.
 * @throws An error if the retrieved data is invalid.
 */
export async function getMeeting(id: number): Promise<Meeting> {
  const response = await apiClient.get<Meeting>(`/meetings/${id}`);

  if (!response.data || !response.data.id) throw new Error("Invalid data");

  response.data.start_date = new Date(response.data.start_date);
  response.data.end_date = new Date(response.data.end_date);

  return response.data;
}

/**
 * Updates a meeting on the server.
 * @param id The ID of the meeting to update.
 * @param data The partial input data for updating the meeting.
 * @returns The updated Meeting object.
 */
export async function updateMeeting(
  id: number,
  data: Partial<CreateMeetingInput>
): Promise<Meeting> {
  const response = await apiClient.patch<Meeting>(`/meetings/${id}`, data);
  return response.data;
}
