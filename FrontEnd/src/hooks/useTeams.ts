import { useCallback, useState } from "react";
import {
  createTeam as createTeamService,
  getAllTeams as getAllTeamsService,
  getTeam as getTeamService,
  deleteTeam as deleteTeamService,
  updateTeam as updateTeamService
} from "../services/teamsService";
import type {
  TeamPayload,
  DeleteTeam,
  UseCreateTeamResponse,
  UseDeleteTeamResponse,
  UseGetTeamResponse,
  UseTeamsListResponse,
  Teams,
  Team,
  useUpdateTeamResponse,
} from "../types/TeamResponse";
import type { AsyncStatus } from "../types/AsyncTypes";

export function useCreateTeam(): UseCreateTeamResponse {
  const [status, setStatus] = useState<AsyncStatus>("idle");

  const createTeam = useCallback(async (payload: TeamPayload) => {
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
  const [teams, setTeams] = useState<Teams[]>([]);
  const [status, setStatus] = useState<AsyncStatus>("idle");

  const fetchTeams = useCallback(async () => {
    setStatus("loading");

    try {
      const data = await getAllTeamsService();
      setTeams(data);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      throw err;
    }
  }, []);

  return {
    teams,
    status,
    fetchTeams,
  };
}

export function useGetTeam(): UseGetTeamResponse {
  const [team, setTeam] = useState<Team[]>([]);
  const [status, setStatus] = useState<AsyncStatus>("idle");

  const fetchTeam = useCallback(async (id: number) => {
    setStatus("loading");

    try {
      const data = await getTeamService(id);
      setTeam(data);
      setStatus("success");
      return data;
    } catch (err) {
      setStatus("error");
      throw err;
    }
  }, []);

  return {
    team,
    status,
    fetchTeam,
  };
}

export function useDeleteTeam(): UseDeleteTeamResponse {
  const [status, setStatus] = useState<AsyncStatus>("idle");
  const [result, setResult] = useState<DeleteTeam | null>(null);

  const deleteTeam = useCallback(async (id: number) => {
    setStatus("loading");

    try {
      const data = await deleteTeamService(id);
      setResult(data);
      setStatus("success");
    } catch (err) {
      setResult(null);
      setStatus("error");
      throw err;
    }
  }, []);

  return {
    status,
    deleteTeam,
    result,
  };
}

export function useUpdateTeam(): useUpdateTeamResponse{
  const [status, setStatus] = useState<AsyncStatus>("idle");

  const updateTeam = useCallback(async (id:number, payload: TeamPayload) => {
    try{
      const data = await updateTeamService(id, payload)
       setStatus("success");
      return data;     
    } catch (err) {
      setStatus("error")
      throw err
    }
  }, []);

  return{
    status,
    updateTeam
  }
}