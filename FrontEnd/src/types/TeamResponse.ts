import type { AsyncStatus } from "./AsyncTypes";

export type CreateTeamResponse = {
  message: string;
  id: number;
  name: string;
  pokemonIds: number[];
};

export type CreateTeamPayload = {
  name: string;
  pokemonIds: number[];
};

export type UseTeamResponse = {
  status: AsyncStatus;
  createTeam: (payload: CreateTeamPayload) => Promise<CreateTeamResponse>;
};

export type GetAllTeams = {
  id: number;
  user_id: number;
  name: string; 
  created_at: string;
}

export type UseTeamsListResponse = {
  teams: GetAllTeams[];
  status: AsyncStatus;
  fetchTeams: () => Promise<void>;
};

export type GetTeam = {
  id:number,
  teamId: number,
  pokemonId: number,
  slot: number
}