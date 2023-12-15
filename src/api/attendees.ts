import { Attendee } from "@/types/Attendee";
import { apiClient } from ".";

export async function getAttendees(email: string): Promise<Attendee[]> {
    const response = await apiClient.get<Attendee[]>(`/meetings/attendees?email=${email}`);
    return response.data;
}