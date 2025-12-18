import type { PokemonCardData } from "../types/Pokemon";

type PokemonCardProps = {
    pokemon: PokemonCardData;
};

const typeColors = {
	normal: 'bg-[#A8A77A]',
	fire: 'bg-[#EE8130]',
	water: 'bg-[#6390F0]',
	electric: 'bg-[#F7D02C]',
	grass: 'bg-[#7AC74C]',
	ice: 'bg-[#96D9D6]',
	fighting: 'bg-[#C22E28]',
	poison: 'bg-[#A33EA1]',
	ground: 'bg-[#E2BF65]',
	flying: 'bg-[#A98FF3]',
	psychic: 'bg-[#F95587]',
	bug: 'bg-[#A6B91A]',
	rock: 'bg-[#B6A136]',
	ghost: 'bg-[#735797]',
	dragon: 'bg-[#6F35FC]',
	dark: 'bg-[#705746]',
	steel: 'bg-[#B7B7CE]',
	fairy: 'bg-[#D685AD]',    
};

export function PokemonCard({pokemon}: PokemonCardProps){
    return(
        <div className="p-4 rounded-lg bg-slate-100">
            <img src={pokemon.image} alt={pokemon.name} />

            <h2 className="font-bold capitalize">{pokemon.name}</h2>
            <p className="text-xs">0{pokemon.id} </p>

            <ul className="flex gap-1">
                {pokemon.types.map(type => (
                <li 
                    key={type} 
                    className={`py-[1px] px-[7px] capitalize text-white rounded-lg ${typeColors[type as keyof typeof typeColors]}`}
                >{type}</li>
                ))}
            </ul>
        </div>
    )
}