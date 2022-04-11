import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGurd } from "../auth/auth.gurd.service";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe.start.component";
import { RecipesComponent } from "./recipes.component";
import { RecipesResolver } from "./recipes.resolver.service";

const RecipesRoutes: Routes = [
  {path: '', component: RecipesComponent, canActivate: [AuthGurd], children: [
    {path: '', component: RecipeStartComponent, pathMatch: 'full'},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipeDetailComponent, resolve:[RecipesResolver]},
    {path: ':id/edit', component: RecipeEditComponent, resolve:[RecipesResolver]}
  ] }
]

@NgModule({
  imports: [
    RouterModule.forChild(RecipesRoutes)
  ],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}