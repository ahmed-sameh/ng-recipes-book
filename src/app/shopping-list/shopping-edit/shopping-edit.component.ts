import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('ingredientName', {static: true}) ingName! : ElementRef;
  @ViewChild('ingredientAmount', {static: true}) ingAmount! : ElementRef;

  @Output() onAddIngred =  new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }
 
  onAddIngredient() {
    if(this.ingName && this.ingAmount) {
      this.onAddIngred.emit(new Ingredient(this.ingName.nativeElement.value, this.ingAmount.nativeElement.value))
    }
  }

}
