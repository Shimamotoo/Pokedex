import type { TeamPayload } from "../types/TeamPayload";
import APIUrl from "./baseURL"

export async function createTeam(payload: TeamPayload) {
    const response = await APIUrl.post("api/teams", payload);
    return response.data;
}