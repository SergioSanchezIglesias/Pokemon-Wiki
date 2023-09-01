import { Component, Input } from '@angular/core';
import { PokemonInterface } from 'src/app/interfaces/pokemon.interface';
import { TiposPokemon } from 'src/app/interfaces/tipos-pokemon.interface';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  constructor() { }

  @Input() pokemon!: PokemonInterface;
  @Input() pokemonImage!: string;

  

}
