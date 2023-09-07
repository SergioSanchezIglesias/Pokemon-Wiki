import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-type-card',
  templateUrl: './pokemon-type-card.component.html',
  styleUrls: ['./pokemon-type-card.component.css']
})
export class PokemonTypeCardComponent {

  constructor() { }

   @Input() pokemonTypeName!: string[];

}
