import pokeApi from "./pokeAPI";
import type {
  PokemonItem,
  PokemonDetails,
  PokemonCardData,
} from "../types/Pokemon";

export const pokemonService = {
  async getPokemons(limit = 151): Promise<PokemonItem[]> {
    const response = await pokeApi.get(`/pokemon?limit=${limit}`);
    return response.data.results;
  },

  async getPokemonDetail(name: string): Promise<PokemonDetails> {
    const response = await pokeApi.get(`/pokemon/${name}`);
    return response.data;
  },

  async getPokemonItem(limit = 151): Promise<PokemonCardData[]> {
    const pokemonsNomes = await this.getPokemons(limit);

    const detailsPromises = pokemonsNomes.map((p) =>
      this.getPokemonDetail(p.name),
    );
    const pokemonsDetails = await Promise.all(detailsPromises);

    return pokemonsDetails.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      image:
        pokemon.sprites?.other?.["official-artwork"]?.front_default ??
        pokemon.sprites.front_default ??
        "",
      types: pokemon.types.map((t) => t.type.name),
    }));
  },
};
