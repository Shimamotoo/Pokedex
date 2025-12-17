import pokeApi from "./pokeAPI";
import type { PokemonItem, PokemonDetails, PokemonCardData } from "../types/Pokemon";

export const pokemonService = {

  async getPokemons(limit = 9): Promise<PokemonItem[]> {
    const response = await pokeApi.get(`/pokemon?limit=${limit}`);
    return response.data.results;
  },

  async getPokemonDetail(name:string): Promise<PokemonDetails>{
    const response = await pokeApi.get(`/pokemon/${name}`);
    return response.data
  },

  async getPokemonItem(): Promise<PokemonCardData[]>{
    const pokemonsNomes = this.getPokemons();

    const Details = (await pokemonsNomes).map(p => this.getPokemonDetail(p.name))

    const PokemonsDetails = await Promise.all(Details)

    const PokemonCard:PokemonCardData[] = PokemonsDetails.map(pokemon =>({
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.front_default ?? "",
      types: pokemon.types.map(t => t.type.name),
    }))

    return PokemonCard
  }
}