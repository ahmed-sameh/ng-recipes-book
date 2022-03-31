
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";


export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>();

  ingredientItemEdit =  new Subject<number>();
  
  private ingredients: Ingredient[] = [
    new Ingredient('test', 10)
  ];
  
  getIngredients() {
    return this.ingredients.slice();
  }
  
  getSingleIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  onDeleteIng(ingredientIndex: number) {
    this.ingredients.splice(ingredientIndex,1)
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  updateSingleIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice())
  }
  
  updateIngredients(newIngredients: Array<Ingredient>) {
    this.ingredients.push(...newIngredients);
    this.ingredientsChanged.next(this.ingredients.slice())
  }
 }