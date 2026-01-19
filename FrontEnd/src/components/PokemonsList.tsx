import type { PokemonCardData } from "../types/Pokemon";
import { PokemonCard } from "./PokemonCard";

type PokemonsListProps = {
    pokemonsList: PokemonCardData[];
    onSelectPokemon?: (pokemon: PokemonCardData) => void;
}

export function PokemonsList({pokemonsList, onSelectPokemon }: PokemonsListProps) {
    if(pokemonsList.length === 0){
        return <p>Nenhum pokemon foi encontrado.</p>
    }

    return(
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-5 lg:grid-cols-9">
            {pokemonsList.map(pokemon => (
                <PokemonCard 
                    key={pokemon.id} 
                    pokemon={pokemon} 
                    onSelect={onSelectPokemon}
                />
            ))}
        </ul>
    )
    
}