import APIUrl from './baseURL';
import type {
  CreateTeamResponse,
  TeamPayload,
  DeleteTeam,
  Teams,
  Team,
  UpdateTeam,
} from "../types/TeamResponse";

//----------GetAll----------
export async function getAllTeams(): Promise<Teams[]> {
  const response = await APIUrl.get<Teams[]>("api/teams/listar");
  return response.data
}

//----------Get----------
export async function getTeam(id: number): Promise<Team[]> {
  const response = await APIUrl.get<Team[]>(`api/teams/visualizar/${id}`)
  return response.data;
}

//----------Create----------
export async function createTeam(payload: TeamPayload): Promise<CreateTeamResponse> {
  const response = await APIUrl.post<CreateTeamResponse>("api/teams", payload);
  return response.data;
}

//----------Delete----------
export async function deleteTeam(id: number): Promise<DeleteTeam> {
  const response = await APIUrl.delete<DeleteTeam>(`api/teams/deletar/${id}`)
  return response.data
}

//----------Update----------
export async function updateTeam(id:number, payload: TeamPayload): Promise<UpdateTeam> {
  const response = await APIUrl.put<UpdateTeam>(`api/teams/alterar/${id}`, payload)
  return response.data
}