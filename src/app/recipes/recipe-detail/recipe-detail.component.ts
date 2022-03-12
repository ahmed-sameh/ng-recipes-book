import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shoppinList.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  // @Input('Recipe') selectedRecipe!: Recipe;
  selectedRecipe!: Recipe;
  constructor(private shoppingListService: ShoppingListService, private recipeService: RecipeService,private currentRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.currentRoute.params.subscribe( (updatedParams: Params) => {
      let id = updatedParams['id'];
      this.selectedRecipe = this.recipeService.getRecipe(+id)
    })

  }

  onAddToShoppingList() {
    this.shoppingListService.updateIngredients(this.selectedRecipe.ingredients)
  }

  onRecipeEdit() {
    this.router.navigate(['edit'], {relativeTo: this.currentRoute})
  }
}
