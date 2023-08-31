import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, of, tap } from 'rxjs';


import { environments } from 'src/environments/environments';
import { PokemonInterface } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  searchPokemonByName(name: string): Observable<PokemonInterface> {
    return this.http.get<PokemonInterface>(`${environments.apiUrl}/pokemon/${name}`)
      .pipe(
        catchError(() => of()),
      );
  }
}
