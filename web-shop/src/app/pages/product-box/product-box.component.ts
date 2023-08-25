import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl:'./product-box.component.html'
})
export class ProductBoxComponent {
  @Input() fullWidthMode=false;
  @Output() addToCart =new EventEmitter<Product>();

  product:Product|undefined={
    id:1,
    title:"Snickers",
    price:150,
    category:"shoes",
    description:"Description",
    image:"https://via.placeholder.com/150"

  }

  onAddToCart(){
    this.addToCart.emit(this.product);

  }
}
