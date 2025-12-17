import type { PokemonCardData } from "../types/Pokemon";
import { PokemonCard } from "./PokemonCard";

type PokemonsListProps = {
    pokemonsList: PokemonCardData[];
}

export function PokemonsList({pokemonsList}: PokemonsListProps) {
    if(pokemonsList.length === 0){
        return <p>Nenhum pokemon foi encontrado.</p>
    }

    return(
        <ul>
            {pokemonsList.map(pokemon => (
                <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))}
        </ul>
    )
    
}