import { Component } from '@angular/core';
import { PokemonInterface } from 'src/app/interfaces/pokemon.interface';
import { DamageRelations, Generation } from 'src/app/interfaces/tipos-pokemon.interface';
import { PokemonService } from 'src/app/services/pokemon.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  public pokemonSearched!: PokemonInterface;
  public pokemonImage!: string;
  public pokemonTypeName: string[] = [];

  public arrayDoubleDamageFrom: Generation[] = [];
  public arrayDoubleDamageto: Generation[] = [];
  public arrayHalfDamageFrom: Generation[] = [];
  public arrayHalfDamageTo: Generation[] = [];
  public arrayNoDamageFrom: Generation[] = [];
  public arrayNoDamageTo: Generation[] = [];




  private pokemonUrlType!: string[];

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

        let auxType: string[] = [];
        let auxDamage: DamageRelations[] = [];

        this.pokemonUrlType.forEach((type) => {
          //! Obtengo el nombre del tipo (inglés y otros idiomas en variable names) y contra que es fuerte y débil
          this.pokemonService.searchPokemonTypeByUrl(type)
            .subscribe(({ damage_relations, names }) => {
              auxType.push(names[5].name);
              auxDamage.push(damage_relations);
              this.pokemonTypeName = auxType;
              damage_relations.double_damage_from.forEach((damage) => {
                this.arrayDoubleDamageFrom.push(damage);
              });
            });
        })
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
}
