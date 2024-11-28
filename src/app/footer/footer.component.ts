import { CommonModule } from '@angular/common';
import { Component,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  order:number[] = [1,2,3,4]
  values:number[] = [1,2,3]
  active:string[] = ["actived","","",""]
  display:string[] = ["","","",""]
  
  @Input() valueSelected: number = 0;
  @Input() lastOption: number = 15;
  
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() pageChanged = new EventEmitter<number>();

  rangeSelection:number[] = [0,0];
  
  ngOnChanges() {
    this.updatePageRange();
  }


  updatePageRange(): void {
    const delta = 2; 
    const range: number[] = [];

    for (let i = Math.max(1, this.currentPage - delta); i <= Math.min(this.totalPages, this.currentPage + delta); i++) {
      range.push(i);
    }

    if (range[0] > 1) {
      range.unshift(1);
      if (range[1] !== 2) range.splice(1, 0, -1);
    }

    if (range[range.length - 1] < this.totalPages) {
      if (range[range.length - 1] !== this.totalPages - 1) range.push(-1); // Añadir "..." al final
      range.push(this.totalPages);
    }

    this.rangeSelection = range;
  }

  // Cambiar página
  changePage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.pageChanged.emit(newPage);
    }
  }

  setSelectedOption(option:number, value:number){

    this.valueSelected = value;

    this.cleanSelection();
    this.active[option - 1] = "actived";

  }

  raiseValues() :void{
    
    this.cleanSelection();

    this.values.forEach((value,index)=>{
      if (value < this.lastOption) {
        this.values[index] += 3;
      }
    })
  } 

  reduceValues() :void{
    
    this.cleanSelection();

    this.values.forEach((value,index)=>{
      if (value > 3) {
        this.values[index] -= 3;
      }
       
    })
  }

  cleanSelection():void{
    this.active.forEach((_,index) =>{
      this.active[index] = ""
    })
  }

}
