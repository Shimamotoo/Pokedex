import type { PokemonCardData } from "../types/Pokemon";

export const TEAM_SIZE = 6;

export type AddResult =
  | { ok: true; team: PokemonCardData[] }
  | { ok: false; team: PokemonCardData[]; reason: "FULL" | "DUPLICATE" };

export function isTeamFull(team: PokemonCardData[], size = TEAM_SIZE) {
  return team.length >= size;
}

export function isPokemonInTeam(team: PokemonCardData[], id: number) {
  return team.some((p) => p.id === id);
}

export function addPokemonToTeam(
  team: PokemonCardData[],
  pokemon: PokemonCardData,
  size = TEAM_SIZE,
): AddResult {
  if (isTeamFull(team, size)) {
    return { ok: false, team, reason: "FULL" };
  }

  if (isPokemonInTeam(team, pokemon.id)) {
    return { ok: false, team, reason: "DUPLICATE" };
  }

  return { ok: true, team: [...team, pokemon] };
}

export function removePokemonFromTeam(team: PokemonCardData[], id: number) {
  return team.filter((p) => p.id !== id);
}

export function isTeamComplete(team: PokemonCardData[], size = TEAM_SIZE) {
  return team.length === size;
}

export function buildSlots<T>(
  items: T[],
  size: number,
): Array<T | null> {
  return Array.from({ length: size }, (_, i) => items[i] ?? null);
}
