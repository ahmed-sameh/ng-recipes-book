import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('test', 10),
    new Ingredient('test', 10),
    new Ingredient('test', 10),
    new Ingredient('test', 10),
  ]
  constructor() { }

  ngOnInit(): void {
  }

  onIngredientAdded(newIngred: Ingredient) {
    this.ingredients.push(newIngred)
  }

}
