import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://ng-recipes-7b90f-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json', recipes).subscribe({
      next: response => console.log(response)
    }
    )
  } 


  fetchRecipes() {

      return this.http.get<Recipe[]>('https://ng-recipes-7b90f-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json').pipe(map( recipes =>{
      return recipes.map( recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        }
      })
    }), tap((recipes: Recipe[]) => {
      this.recipeService.setRecipes(recipes);
    })
    )
     
  }
}
