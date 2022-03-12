import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shoppinList.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('ingredientName', {static: true}) ingName! : ElementRef;
  @ViewChild('ingredientAmount', {static: true}) ingAmount! : ElementRef;

  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit(): void {
  }
 
  onAddIngredient() {
    if(this.ingName && this.ingAmount) {
      this.shoppingService.addIngredient(new Ingredient(this.ingName.nativeElement.value, this.ingAmount.nativeElement.value))
    }
  }

}
