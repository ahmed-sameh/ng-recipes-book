import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { AuthGurd } from "./auth/auth.gurd.service";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe.start.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipesResolver } from "./recipes/recipes.resolver.service";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const AppRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {path: 'recipes', component: RecipesComponent, canActivate: [AuthGurd], children: [
    {path: '', component: RecipeStartComponent, pathMatch: 'full'},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipeDetailComponent, resolve:[RecipesResolver]},
    {path: ':id/edit', component: RecipeEditComponent, resolve:[RecipesResolver]}
  ] },

  {path: 'auth', component: AuthComponent },
  {path: 'shoppingList', canActivate: [AuthGurd], component: ShoppingListComponent },
]

@NgModule({
  imports: [
    RouterModule.forRoot(AppRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}