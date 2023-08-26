import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: 'products-header.component.html',
  
})
export class ProductsHeaderComponent {
  sort="desc";
  itemsShowCount=12;
  @Output() columnsCountChange=new EventEmitter<number>();
  @Output() itemsCountChange=new EventEmitter<number>();
  @Output() sortChange=new EventEmitter<string>();


  onSortUpdate(newSort:string):void{
    this.sort = newSort;
    this.sortChange.emit(newSort)
  }
  onItemsUpdated(count:number):void{
    this.itemsShowCount=count;
    this.itemsCountChange.emit(count);

  }

  onColumnsUpdated(colNumber:number):void{
    this.columnsCountChange.emit(colNumber);

  }

}
