import { useCallback, useState } from "react";
import { createTeam as createTeamService } from "../services/teamsService";
import type { CreateTeamPayload, UseTeamResponse } from "../types/TeamResponse";
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
