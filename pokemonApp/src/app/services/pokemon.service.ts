import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, of, tap } from 'rxjs';


import { environments } from 'src/environments/environments';
import { PokemonSearch } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  searchPokemonByName(name: string): Observable<PokemonSearch[]> {
    return this.http.get<PokemonSearch[]>(`${environments.apiUrl}/pokemon/${name}`)
      .pipe(
        catchError(() => of([])),
        delay(2000),
      );
  }
}
