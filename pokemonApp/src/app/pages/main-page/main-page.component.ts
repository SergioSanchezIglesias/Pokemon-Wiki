import { Component } from '@angular/core';
import { PokemonInterface } from 'src/app/interfaces/pokemon.interface';
import { TiposPokemon } from 'src/app/interfaces/tipos-pokemon.interface';
import { PokemonService } from 'src/app/services/pokemon.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  public pokemonSearched!: PokemonInterface;
  public pokemonImage!: string;
  private pokemonUrlType!: string[];
  public pokemonType!: TiposPokemon;

  constructor(private pokemonService: PokemonService) { }

  onSearch(name: string): void {

    const termSearch = name.toLowerCase()

    //! Consigo todo el Pokemon
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

        //! Obtengo la imagen del pokemon y la ruta sobre su tipo
        this.pokemonImage = sprites.front_default;
        this.pokemonUrlType = this.getTipos();

        // TODO: Sería lo idóneo, pero de momento no sabría como.
        //this.searchTypeByUrl(this.pokemonUrlType);

        //! Obtengo el nombre del tipo (inglés y otros idiomas en variable names) y contra que es fuerte y débil
        this.pokemonService.searchPokemonTypeByUrl(this.pokemonUrlType[0])
          .subscribe(({ damage_relations, name, names }) => {
            this.pokemonType = {
              damage_relations: damage_relations,
              name: name,
              names: names
            };
            console.log(names)
          });
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

  // searchTypeByUrl(url: string[]): void {

  //   // TODO: Hacer un forEach sobre el array pokemonTypes para traernos lo que nos interesa de cada tipo
  //   this.pokemonService.searchPokemonTypeByUrl(url[0])
  //     .subscribe(({ damage_relations, name, names }) => {
  //       this.pokemonType = {
  //         damage_relations: damage_relations,
  //         name: name,
  //         names: names
  //       };
  //     });
  // }

}
