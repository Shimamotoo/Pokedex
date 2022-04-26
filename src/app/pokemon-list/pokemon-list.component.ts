import { PokemonService } from './../services/pokemon.service';
import { Component} from '@angular/core';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent {
  constructor(public pokemonService: PokemonService) {}
}
