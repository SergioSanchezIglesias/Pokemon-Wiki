import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { CardComponent } from './components/card/card.component';
import { PokemonTypeCardComponent } from './components/pokemon-type-card/pokemon-type-card.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    SearchBoxComponent,
    CardComponent,
    PokemonTypeCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      },
      defaultLanguage: 'es'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
