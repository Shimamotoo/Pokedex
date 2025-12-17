export interface PokemonItem {
  name: string;
}

// Sprites
export interface PokemonSprites {
  front_default: string | null;
}

// Types
export interface PokemonType {
  slot: number;
  type: {
    name: string;
  };
}

// Detalhes do Pokémon
export interface PokemonDetails {
  id: number;
  name: string;
  sprites: PokemonSprites;
  types: PokemonType[];
}

export interface PokemonCardData{
  id: number;
  name: string;
  image: string;
  types: string[];
}