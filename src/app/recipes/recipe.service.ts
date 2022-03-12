import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

export class RecipeService {
  
  private recipes: Recipe[] = [
    new Recipe('test name 1', 'test desc', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',[new Ingredient('bread', 1),new Ingredient('orange', 2),new Ingredient('burger', 3)]),
    new Recipe('test name 2', 'test desc', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',[new Ingredient('bread', 1),new Ingredient('orange', 2),new Ingredient('burger', 3)]),
    new Recipe('test name 3', 'test desc', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',[new Ingredient('bread', 1),new Ingredient('orange', 2),new Ingredient('burger', 3)]),
  ]


  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index]
  }
}

