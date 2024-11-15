import { Component, Input} from '@angular/core';
import { Pokemon } from "../models/pokemon.model";

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css'
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

  ngOnInit(): void {
    this.IdFormatted()
    this.typeFormatted()
  }

  IdFormatted(): void {

    if (this.pokemon.id.length === 1) {
      this.pokemon.id = "00" + this.pokemon.id;
    } 
    else if (this.pokemon.id.length === 2) {
      this.pokemon.id = "0" + this.pokemon.id;
    }

  }

  typeFormatted(): void{

    if (this.pokemon.types.length > 1) {
      for (let i = 0; i < this.pokemon.types.length; i++) {
        var type = this.pokemon.types[i];
        if (i===0) {
          this.formattedType = this.formattedType + type.toUpperCase()
        }
        else{
          this.formattedType = this.formattedType + "/" + type.toUpperCase()
        }
      }
    }else{
      this.formattedType = this.pokemon.types[0].toUpperCase()
    }

  }

}



