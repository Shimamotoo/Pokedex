import { useCallback, useState } from "react";
import { createTeam as createTeamService, getAllTeams as getAllTeamsService } from "../services/teamsService";
import type { CreateTeamPayload, GetAllTeams, UseTeamResponse, UseTeamsListResponse } from "../types/TeamResponse";
import type { AsyncStatus } from "../types/AsyncTypes";

export function useTeam(): UseTeamResponse {
  const [status, setStatus] = useState<AsyncStatus>("idle");

  const createTeam = useCallback(async (payload: CreateTeamPayload) => {
    setStatus("loading");

    try {
      const data = await createTeamService(payload);
      setStatus("success");
      return data;
    } catch (err) {
      setStatus("error");
      throw err;
    }
  }, []);

  return {
    status,
    createTeam,
  };
}

export function useTeamsList(): UseTeamsListResponse {
  const [teams, setTeams] = useState<GetAllTeams[]>([]);
  const [status, setStatus] = useState<AsyncStatus>("idle");

  const fetchTeams = useCallback(async () => {
    setStatus("loading");
    try {
      const data = await getAllTeamsService();
      setTeams(data);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      throw err
    }
  }, []);

  return { 
    teams, 
    status, 
    fetchTeams 
  };
}