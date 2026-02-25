import APIUrl from './baseURL';
import type {
  CreateTeamResponse,
  CreateTeamPayload,
  DeleteTeam,
  Teams,
  Team,
} from "../types/TeamResponse";

export async function createTeam(payload: CreateTeamPayload): Promise<CreateTeamResponse> {
  const response = await APIUrl.post<CreateTeamResponse>("api/teams", payload);
  return response.data;
}

export async function getAllTeams(): Promise<Teams[]> {
  const response = await APIUrl.get<Teams[]>("api/teams/listar");
  return response.data
}

export async function getTeam(id: number): Promise<Team[]> {
  const response = await APIUrl.get<Team[]>(`api/teams/visualizar/${id}`)
  return response.data;
}

export async function deleteTeam(id: number): Promise<DeleteTeam> {
  const response = await APIUrl.delete<DeleteTeam>(`api/teams/deletar/${id}`)
  return response.data
}