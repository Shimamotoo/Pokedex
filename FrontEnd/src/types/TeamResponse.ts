import type { AsyncStatus } from "./AsyncTypes";

export type CreateTeamResponse = {
  message: string;
  id: number;
  userId: number;
  name: string;
  pokemonIds: number[];
};

export type UseTeamResponse = {
  status: AsyncStatus;
  createTeam: (payload: CreateTeamPayload) => Promise<CreateTeamResponse>;
};

export type CreateTeamPayload = {
  name: string;
  pokemonIds: number[];
};
