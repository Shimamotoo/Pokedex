import APIUrl from "./baseURL"
import type { CreateTeamResponse, CreateTeamPayload } from "../types/TeamResponse";

export async function createTeam(payload: CreateTeamPayload):Promise<CreateTeamResponse> {
    const response = await APIUrl.post<CreateTeamResponse>("api/teams", payload);
    return response.data;
}