import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';


const ROWS_HEIGHT:{[id:number]:number}={1:400,3:335,4:350};
@Component({
  selector: 'app-home',
  templateUrl:'home.component.html',
  styles: [
  ]
})
export class HomeComponent {
  cols=3;
  rowHeight=ROWS_HEIGHT[this.cols];
  category:string|undefined;

  constructor(private cartService:CartService){}

  onColumnsCountChange(colsNumber:number){
    this.cols=colsNumber;
    this.rowHeight=ROWS_HEIGHT[this.cols];

  }
  onShowCategory(newCategory:string){
    this.category=newCategory;
    
  }
  onAddToCart(product:Product){
    this.cartService.addToCart({product:product.image,name:product.title,price:product.price,quantity:1,id:product.id})

  }

}
