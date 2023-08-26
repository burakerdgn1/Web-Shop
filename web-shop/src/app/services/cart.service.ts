import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });//holds initial valua


  constructor(private _snackBar: MatSnackBar) { }

  addToCart(item: CartItem) {
    const items = [...this.cart.value.items];  //we dont want to affect the original cart object, so copy it

    const itemInCart = items.find((_item) =>
      _item.id === item.id
    );

    if (itemInCart) {
      itemInCart.quantity += 1;
    }
    else {
      items.push(item);
    }

    this.cart.next({ items });
    this._snackBar.open("1 item added to cart.", "Ok", { duration: 3000 });

  }
  removeQuantity(item: CartItem) {
    let itemToRemove: CartItem | undefined;
    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
        if (_item.quantity === 0) {
          itemToRemove = _item;
        }
      }
      return _item;
    });
    if (itemToRemove) {
      filteredItems = this.removeItem(itemToRemove);
    }

    this.cart.next({ items: filteredItems });

    this._snackBar.open('1 item removed from cart', 'Ok', { duration: 3000 })

  }
  getTotal(items: Array<CartItem>): number {
    return items.map((item) =>
      item.price * item.quantity

    ).reduce((prev, current) => prev + current, 0);

  };

  clearCart() {
    this.cart.next({ items: [] });
    this._snackBar.open('Cart is cleared', 'Ok', { duration: 3000 });
  }
  removeItem(item: CartItem, update = true):Array<CartItem> {
    const filteredItems = this.cart.value.items.filter((_item) => _item.id !== item.id);

    if (update) {
      this.cart.next({ items: filteredItems });
      this._snackBar.open('1 item removed from cart', 'Ok', { duration: 3000 });
    }
    return filteredItems;
  }
}
