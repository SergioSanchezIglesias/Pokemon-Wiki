import { Component, Input } from '@angular/core';
import { PokemonInterface } from 'src/app/interfaces/pokemon.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  private tipoUrl?: string;

  constructor() { }

  @Input() pokemon!: PokemonInterface;
  @Input() pokemonImage!: string

  getTipos() {
    if (this.pokemon.types) {
      // this.pokemon.types.forEach((type) => {
      //   console.log(type.type.url);
      // });
      console.log(this.pokemon.types);
    }
  }

}
