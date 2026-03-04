import type { AsyncStatus } from "./AsyncTypes";

export type AsyncHookState = {
  status: AsyncStatus;
};

export type TeamPayload = {
  name: string;
  pokemonIds: number[];
};

export type CreateTeamResponse = {
  message: string;
  id: number;
  name: string;
  pokemonIds: number[];
};

export type UseCreateTeamResponse = AsyncHookState & {
  createTeam: (payload: TeamPayload) => Promise<CreateTeamResponse>;
};

export type Teams = {
  id: number;
  user_id: number;
  name: string; 
  created_at: string;
}

export type UseTeamsListResponse = AsyncHookState & {
  teams: Teams[];
  fetchTeams: () => Promise<void>;
};

export type Team = {
  id:number,
  team_id: number,
  pokemon_id: number,
	slot: number,
	name?: string
}

export type UseGetTeamResponse = AsyncHookState & {
  team:Team[]
	fetchTeam:(id:number) => Promise<Team[]>;
}

export type DeleteTeam = {
  message: string
  teamId: string
}

export type UseDeleteTeamResponse = AsyncHookState &{
  deleteTeam:(id:number) => Promise<void>;
  result: DeleteTeam | null;
}

export type UpdateTeam = {
	message: string,
	teamId: string,
	name: string  
}

export type useUpdateTeamResponse = AsyncHookState &{
  updateTeam:(id:number, payload: TeamPayload) => Promise<UpdateTeam>;
}