import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart=new BehaviorSubject<Cart>({items:[]});//holds initial valua


  constructor(private _snackBar:MatSnackBar) { }

  addToCart(item:CartItem){
    const items= [...this.cart.value.items]   //we dont want to affect the original cart object, so copy it

    const itemsInCart=items.find((_item)=>{
      _item.id===item.id
    });

    if(itemsInCart){
      itemsInCart.quantity+=1;
    }
    else{
      items.push(item);
    }

    this.cart.next({items});
    this._snackBar.open("1 item added to cart.","Ok",{duration:3000});
    console.log(this.cart.value);

  }
}
