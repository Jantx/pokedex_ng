import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonCardComponent } from "./pokemon-card/pokemon-card.component";
import { HttpClient } from '@angular/common/http';
import { Pokemon } from "./models/pokemon.model";
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PokemonCardComponent, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title: string = "pokemon"
  allPokemons: Pokemon[] = [];
  displayedPokemons: Pokemon[] = [];
  isLoading: boolean = true; 
  selectedType: string = 'All'; 
  itemsPerPage: number = 24; 
  currentPage: number = 1; 
  totalPages: number = 1; 

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAllPokemons();
  }

  async getAllPokemons() {
    const requests = [];

    
    const totalPokemons = 800; 

    for (let i = 1; i <= totalPokemons; i++) {
      requests.push(this.http.get(`https://pokeapi.co/api/v2/pokemon/${i}`).toPromise());
    }

    try {
      const response: any[] = await Promise.all(requests);

      this.allPokemons = response.map((data: any) => ({
        id: data.id.toString(),
        name: data.name,
        weight: data.weight,
        height: data.height,
        types: data.types.map((t: any) => t.type.name),
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`
      })).sort((a, b) => parseInt(a.id) - parseInt(b.id));

      this.isLoading = false;
      this.updateDisplayedPokemons();
    } catch (error) {
      console.error("Error getting Pokemons", error);
      this.isLoading = false;
    }
  }

  updateDisplayedPokemons(): void {
    
    const filteredPokemons = this.selectedType === 'All'
      ? this.allPokemons
      : this.allPokemons.filter(pokemon => pokemon.types.includes(this.selectedType.toLowerCase()));

   
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

  
    this.displayedPokemons = filteredPokemons.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(filteredPokemons.length / this.itemsPerPage);
  }

  onTypeSelected(type: string): void {
    this.selectedType = type;
    this.currentPage = 1;
    this.updateDisplayedPokemons();
  }

  onPageChanged(newPage: number): void {
    this.currentPage = newPage;
    this.updateDisplayedPokemons();
  }
}
