import { Component, Input } from '@angular/core';
import { PokemonTypeDamage } from 'src/app/interfaces';

@Component({
  selector: 'app-pokemon-type-card',
  templateUrl: './pokemon-type-card.component.html',
  styleUrls: ['./pokemon-type-card.component.css']
})
export class PokemonTypeCardComponent {

  constructor() { }

  @Input() pokemonTypeName!: string[];
  @Input() arrayDoubleDamageFrom: PokemonTypeDamage[] = [];
  @Input() arrayDoubleDamageTo: PokemonTypeDamage[] = [];
  @Input() arrayHalfDamageFrom: PokemonTypeDamage[] = [];
  @Input() arrayHalfDamageTo: PokemonTypeDamage[] = [];
  @Input() arrayNoDamageFrom: PokemonTypeDamage[] = [];
  @Input() arrayNoDamageTo: PokemonTypeDamage[] = [];

}
