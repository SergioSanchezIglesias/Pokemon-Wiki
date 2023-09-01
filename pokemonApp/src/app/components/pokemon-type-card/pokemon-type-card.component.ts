import { Component, Input } from '@angular/core';
import { TiposPokemon } from 'src/app/interfaces/tipos-pokemon.interface';

@Component({
  selector: 'app-pokemon-type-card',
  templateUrl: './pokemon-type-card.component.html',
  styleUrls: ['./pokemon-type-card.component.css']
})
export class PokemonTypeCardComponent {

  constructor() { }

   @Input() pokemonType!: TiposPokemon;

}
