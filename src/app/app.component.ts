import { Component, inject, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonCardComponent } from "./pokemon-card/pokemon-card.component";
import { HttpClient } from '@angular/common/http';
import { Pokemon } from "./models/pokemon.model";
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PokemonCardComponent,CommonModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation:ViewEncapsulation.None

})
export class AppComponent {
  title = 'Pokedex';
  pokemons: Pokemon[] = [];
  isLoading: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit(){
    this.getAllPokemons();
  }

  async getAllPokemons(){
      const requests = [];

      for (let i = 1; i <= 700; i++) {
        requests.push(this.http.get(`https://pokeapi.co/api/v2/pokemon/${i}`).toPromise())
        
      }

      try {
        const response: any[] = await Promise.all(requests)

        this.pokemons = response.map((data: any) => ({
          id: data.id.toString(),
          name: data.name,
          weight: data.weight,
          height: data.height,
          types: data.types.map((t: any) => t.type.name),
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`
        })).sort((a,b) => parseInt(a.id) - parseInt(b.id));

        this.isLoading = false;
      } catch (error){
        console.error("Error getting Pokemons", error);
        this.isLoading = false;
      }
    }
}