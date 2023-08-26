import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';


const ROWS_HEIGHT:{[id:number]:number}={1:400,3:335,4:350};
@Component({
  selector: 'app-home',
  templateUrl:'home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit,OnDestroy{
  cols=3;
  rowHeight=ROWS_HEIGHT[this.cols];
  category:string|undefined;
  products:Array<Product>|undefined;
  sort='desc';
  count='12';
  productsSubscription:Subscription|undefined;
  constructor(private cartService:CartService,private storeService:StoreService){}
  ngOnDestroy(): void {
    if(this.productsSubscription){
      this.productsSubscription.unsubscribe();
    }
   
  }

  ngOnInit(): void {
    this.getProducts();

  }
  getProducts(){
    this.productsSubscription=this.storeService.getAllProducts(this.count,this.sort,this.category).subscribe((_products)=>{
      this.products=_products;
    })
  }

  onColumnsCountChange(colsNumber:number){
    this.cols=colsNumber;
    this.rowHeight=ROWS_HEIGHT[this.cols];

  }
  onShowCategory(newCategory:string){
    this.category=newCategory;
    this.getProducts();
    
  }
  onAddToCart(product:Product){
    this.cartService.addToCart({product:product.image,name:product.title,price:product.price,quantity:1,id:product.id})

  }
  onItemsCountChange(newCount:number){
    this.count=newCount.toString();
    this.getProducts();

  }
  onSortChange(newSort:string){
    this.sort=newSort;
    this.getProducts();
  }

}
