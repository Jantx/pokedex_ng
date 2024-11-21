import { Component, Input, ViewEncapsulation} from '@angular/core';
import { Pokemon } from "../models/pokemon.model";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css',
  encapsulation:ViewEncapsulation.None
})
export class PokemonCardComponent {
  
  @Input() pokemon: Pokemon ={ 
    id: "1",
    name: "Lucario",
    weight: "6.9",
    height: "0.7",
    types: ["fighter","iron"],
    image: "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/d/d0/latest/20150621180604/Lucario.png/800px-Lucario.png"
  } 

  formattedType: string = ""
  formmatedId: string = ""

  ngOnInit(): void {
    this.IdFormatted()
  }

  IdFormatted(): void {

    if (this.pokemon.id.length === 1) {
      this.formmatedId = "00" + this.pokemon.id;
    } 
    else if (this.pokemon.id.length === 2) {
      this.formmatedId = "0" + this.pokemon.id;
    }else{
      this.formmatedId = this.pokemon.id;
    }

  }

}



