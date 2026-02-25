import APIUrl from './baseURL';
import type {
  CreateTeamResponse,
  CreateTeamPayload,
  GetAllTeams,
} from "../types/TeamResponse";

export async function createTeam(
  payload: CreateTeamPayload,
): Promise<CreateTeamResponse> {
  const response = await APIUrl.post<CreateTeamResponse>("api/teams", payload);
  return response.data;
}

export async function getAllTeams(): Promise<GetAllTeams[]> {
  const response = await APIUrl.get<GetAllTeams[]>("api/teams/listar");
  return response.data
}
