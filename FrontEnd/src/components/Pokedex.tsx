import { useState, useEffect } from "react";
import { pokemonService } from "../service/pokemonService";
import type { PokemonCardData } from "../types/Pokemon";
import { PokemonsList } from './PokemonsList';

export function Pokedex(){

    const [pokemons, setPokemons] = useState<PokemonCardData[]>([]);
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPokemons()
    }, [])

    const loadPokemons = async() => {
        try{
            const data = await pokemonService.getPokemonItem();
            setPokemons(data)
        } catch(error) {
            console.error('Erro ao carregar os pokemons', error)
        } finally{
            setLoading(false)
        }
    }

    if (loading) {
        return <p>Carregando...</p>;
    }

    return(
        <div>
            <PokemonsList 
                pokemonsList = {pokemons} 
            />
        </div>
    )
}

export default Pokedex;