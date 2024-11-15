import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonCardComponent } from "./pokemon-card/pokemon-card.component";
import { HttpClient } from '@angular/common/http';
import { Pokemon } from "./models/pokemon.model";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PokemonCardComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  http = inject(HttpClient);
  title = 'Pokedex';
  pokemons: Pokemon[] = [];


  ngOnInit(){
    for (let i = 1; i < 100; i++) {
      this.http.get<Pokemon>("https://pokeapi.co/api/v2/pokemon/"+i)
      .subscribe((data:any) =>{
        
        let types = [];
      
        for (let i = 0; i < data.types.length; i++) {
         types.push(data.types[i].type.name);
        }

        this.pokemons.push({
          id: data.id,
          name: data.name,
          weight: data.weight,
          height: data.height,
          types: types,
          image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+i+".png"
        })
      })
    }
   
  }
}
