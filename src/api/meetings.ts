import { CreateMeetingInput, Meeting } from "@/types/Meeting";
import { apiClient } from ".";

export async function getFutureMeetings(): Promise<Meeting[]> {
    const response =  await apiClient.get<Meeting[]>("/meetings");
    return response.data;
}

export async function getPreviousMeetings(before: Date): Promise<Meeting[]> {
    const response = await apiClient.get<Meeting[]>(`/meetings?before=${before.getTime()}`);
    return response.data;
}

export async function createMeeting(data: CreateMeetingInput): Promise<Meeting> {
    const response = await apiClient.post<Meeting>("/meetings", data)
    return response.data;
}

export async function deleteMeeting(id: string): Promise<void> {
    await apiClient.delete(`/meetings/${id}`);
}

export async function getMeeting(id: string): Promise<Meeting> {
    const response = await apiClient.get<Meeting>(`/meetings/${id}`);
    return response.data;
}

export async function updateMeeting(id: string, data: Partial<CreateMeetingInput>): Promise<Meeting> {
    const response = await apiClient.patch<Meeting>(`/meetings/${id}`, data);
    return response.data;
}

