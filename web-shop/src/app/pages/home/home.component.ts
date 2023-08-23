import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl:'home.component.html',
  styles: [
  ]
})
export class HomeComponent {
  cols=3;
  category:string|undefined;

  onColumnsCountChange(colsNumber:number){
    this.cols=colsNumber;

  }
  onShowCategory(newCategory:string){
    this.category=newCategory;
    
  }

}
