import { Component } from '@angular/core';
import { Observable, catchError, delay, of, tap } from 'rxjs';
import { PokemonSearch } from 'src/app/interfaces/pokemon.interface';
import { PokemonService } from 'src/app/services/pokemon.service';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  constructor(private pokemonService: PokemonService) { }



  onSearch(term: any): void {

    const name = term.target.value;
    
    this.pokemonService.searchPokemonByName(name)
      .subscribe(pokemons => {
        console.log(pokemons);
      });
  }

}
