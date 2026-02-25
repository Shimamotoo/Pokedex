import type { AsyncStatus } from "./AsyncTypes";

export type AsyncHookState = {
  status: AsyncStatus;
};

export type CreateTeamPayload = {
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
  createTeam: (payload: CreateTeamPayload) => Promise<CreateTeamResponse>;
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
  teamId: number,
  pokemonId: number,
  slot: number
}

export type UseGetTeamResponse = AsyncHookState & {
  team:Team[]
  fetchTeam:(id:number) => Promise<void>;
}

export type DeleteTeam = {
  message: string
  teamId: string
}

export type UseDeleteTeamResponse = AsyncHookState &{
  deleteTeam:(id:number) => Promise<void>;
  result: DeleteTeam | null;
}