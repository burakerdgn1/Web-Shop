import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.component.html'
})
export class CartComponent implements OnInit{
  constructor(private cartService:CartService){}
  ngOnInit(): void {
    this.dataSource=this.cart.items;
    this.cartService.cart.subscribe((_cart:Cart)=>{
      this.cart=_cart;
      this.dataSource=this.cart.items;
      //local storage could be added

    })
  }
  cart:Cart={items:[{
    product:'https://via.placeholder.com/150',
    name:'snickers',
    price:150,
    quantity:1,
    id:1

  },{
    product:'https://via.placeholder.com/150',
    name:'snickers',
    price:150,
    quantity:2,
    id:2

  }]};
  dataSource:Array<CartItem>=[];
  displayedColumns:Array<string>=[
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ]
  ;

  getTotal(items:Array<CartItem>):number{
    return this.cartService.getTotal(items);

  };

  onClearCart(){
    this.cartService.clearCart();
  }
  onRemoveItem(item:CartItem){
    this.cartService.removeItem(item);

  }
  onAddQuantity(item:CartItem){
    this.cartService.addToCart(item);

  }
  onRemoveQuantity(item:CartItem){
    this.cartService.removeQuantity(item);
  }
  

}
