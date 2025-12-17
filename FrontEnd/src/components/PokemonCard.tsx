import type { PokemonCardData } from "../types/Pokemon";

type PokemonCardProps = {
    pokemon: PokemonCardData;
};

export function PokemonCard({pokemon}: PokemonCardProps){
    return(
        <div>
            <img src={pokemon.image} alt={pokemon.name} />

            <h2>{pokemon.name}</h2>

            <ul>
                {pokemon.types.map(type => (
                <li key={type}>{type}</li>
                ))}
            </ul>
        </div>
    )
}