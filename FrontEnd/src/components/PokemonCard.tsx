import type { PokemonCardData } from "../types/Pokemon";

type PokemonCardProps = {
  pokemon: PokemonCardData;
  onSelect?: (pokemon: PokemonCardData) => void;
};

const typeHex: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export function PokemonCard({ pokemon, onSelect }: PokemonCardProps) {
  return (
    <div
      onClick={() => onSelect?.(pokemon)}
      className="p-4 bg-gray-800 border border-gray-700 cursor-pointer rounded-xl hover:border-indigo-600"
    >
      <img src={pokemon.image} alt={pokemon.name} className="mx-auto mb-2" />

      <h2 className="font-bold text-white capitalize">{pokemon.name}</h2>
      <p className="text-xs text-slate-300">
        #{pokemon.id.toString().padStart(3, "0")}
      </p>

      <ul className="flex gap-1 mt-2">
        {pokemon.types.map((rawType) => {
          const key = rawType.trim().toLowerCase();
          const bg = typeHex[key] ?? "#9CA3AF";

          return (
            <li
              key={`${pokemon.id}-${key}`}
              style={{ backgroundColor: bg }}
              className="py-[2px] px-[8px] text-xs capitalize text-white rounded-full"
            >
              {rawType}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
