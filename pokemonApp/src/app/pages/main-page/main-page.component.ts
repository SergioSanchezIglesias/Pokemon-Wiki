import { Component } from '@angular/core';

import { PokemonService } from 'src/app/services/pokemon.service';
import { DamageRelations, Generation, PokemonInterface, PokemonTypeDamage } from 'src/app/interfaces';




@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  public pokemonSearched!: PokemonInterface;
  public pokemonImage!: string;
  public pokemonTypeName: string[] = [];

  public arrayDoubleDamageFrom: PokemonTypeDamage[] = [];
  public arrayDoubleDamageTo: PokemonTypeDamage[] = [];
  public arrayHalfDamageFrom: PokemonTypeDamage[] = [];
  public arrayHalfDamageTo: PokemonTypeDamage[] = [];
  public arrayNoDamageFrom: PokemonTypeDamage[] = [];
  public arrayNoDamageTo: PokemonTypeDamage[] = [];




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

        // Limpieza de los arrays para que no queden datos residuales
        this.arrayDoubleDamageFrom = []; 
        this.arrayDoubleDamageTo = [] 
        this.arrayHalfDamageFrom = []; 
        this.arrayHalfDamageTo = [] 
        this.arrayNoDamageFrom = []; 
        this.arrayNoDamageTo = []; 

        let auxType: string[] = [];
        let auxPokemon: PokemonTypeDamage;

        this.pokemonUrlType.forEach((type) => {
          //! Obtengo el nombre del tipo (inglés y otros idiomas en variable names) y contra que es fuerte y débil
          this.pokemonService.searchPokemonTypeByUrl(type)
            .subscribe(({ damage_relations, names }) => {
              auxType.push(names[5].name);
              this.pokemonTypeName = auxType;

              // Array DoubleDamageFrom
              auxPokemon = this.completeArrays(names[5].name, 'double_damage_from', damage_relations);
              this.arrayDoubleDamageFrom.push(auxPokemon);

              // Array DoubleDamageTo
              auxPokemon = this.completeArrays(names[5].name, 'double_damage_to', damage_relations);
              this.arrayDoubleDamageTo.push(auxPokemon);

              // Array HalfDamageFrom
              auxPokemon = this.completeArrays(names[5].name, 'half_damage_from', damage_relations);
              this.arrayHalfDamageFrom.push(auxPokemon);

              // Array HalfDamageTo
              auxPokemon = this.completeArrays(names[5].name, 'half_damage_to', damage_relations);
              this.arrayHalfDamageTo.push(auxPokemon);

              // Array NoDamageFrom
              auxPokemon = this.completeArrays(names[5].name, 'no_damage_from', damage_relations);
              this.arrayNoDamageFrom.push(auxPokemon);

              // Array NoDamageTo
              auxPokemon = this.completeArrays(names[5].name, 'no_damage_to', damage_relations);
              this.arrayNoDamageTo.push(auxPokemon);

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

  completeArrays(typeName: string, typeAttack: string, damage_relations: DamageRelations): PokemonTypeDamage {

    let auxPokemon: PokemonTypeDamage;

    auxPokemon = { tipo_ataque: typeName, ataques: [] };
    damage_relations[typeAttack].forEach((attack: Generation) => {
      auxPokemon.ataques.push(attack.name);
    });

    return auxPokemon;
  }

}


