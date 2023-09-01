import { Component } from '@angular/core';
import { PokemonInterface } from 'src/app/interfaces/pokemon.interface';
import { PokemonService } from 'src/app/services/pokemon.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  public pokemonSearched!: PokemonInterface;
  public pokemonImage!: string;
  public pokemonType!: string[];

  constructor(private pokemonService: PokemonService) { }

  onSearch(name: string): void {

    const termSearch = name.toLowerCase()

    this.pokemonService.searchPokemonByName(termSearch)
      .subscribe(({ id, location_area_encounters, name, order, sprites, types }) => {
        this.pokemonSearched = {
          id: id,
          location_area_encounters: location_area_encounters,
          name: name,
          order: order,
          sprites: sprites,
          types: types,
        };

        this.pokemonImage = sprites.front_default;
        this.pokemonType = this.getTipos();
        this.searchTypeByUrl(this.pokemonType);
      });
  }
  

  getTipos(): string[] {

    let arrayAux: string[] = [];

    if (this.pokemonSearched.types) {
      this.pokemonSearched.types.forEach((type) => {
        arrayAux.push(type.type.url);
      });
    }
    return arrayAux;
  }

  searchTypeByUrl(url: string[]): void {
    // TODO: Hacer un forEach sobre el array pokemonTypes para traernos lo que nos interesa de cada tipo
    this.pokemonService.searchPokemonTypeByUrl(url[0])
    .subscribe((resp) => {
      console.log(resp);
    })
  }

}
