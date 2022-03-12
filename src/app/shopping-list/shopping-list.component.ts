import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppinList.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients!: Ingredient[];
  ingChangeSub!: Subscription;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients =  this.shoppingListService.getIngredients();
   
    this.ingChangeSub = this.shoppingListService.ingredientsChanged.subscribe( newIngredient => {
      this.ingredients = newIngredient
    })
  }

  ngOnDestroy(): void {
    this.ingChangeSub.unsubscribe()
  }


}
