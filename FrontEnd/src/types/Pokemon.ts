export interface PokemonItem {
  name: string;
}

export interface PokemonSprites {
  front_default: string | null;
  other?: {
    "official-artwork"?: {
      front_default: string | null;
    };
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
  };
}

export interface PokemonDetails {
  id: number;
  name: string;
  sprites: PokemonSprites;
  types: PokemonType[];
}

export interface PokemonCardData {
  id: number;
  name: string;
  image: string;
  types: string[];
}
