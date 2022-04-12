import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id!:number;
  editingMode = false;
  recipeEditeForm!: FormGroup;

  constructor(private router: Router ,private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    
    this.route.params.subscribe( (params: Params) => {
      this.id = params['id'];
      this.editingMode = params['id'] != null;
      this.recipeFormInit();
    })

  }
  
  recipeFormInit() {
    let recipeName = '';    
    let recipeImg = '';
    let recipeDesc = ''; 
    let recipeIngredients = new FormArray([]);
    
    if(this.editingMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImg = recipe.imgPath;
      recipeDesc = recipe.description;
      if(recipe['ingredients']) {
        recipe.ingredients.forEach( ing => {
          recipeIngredients.push(new FormGroup({
            'ingName': new FormControl(ing.ingName, Validators.required),
            'ingAmount': new FormControl(ing.ingAmount, [Validators.required, Validators.min(1)])
          }))
        })
      }
    }

    this.recipeEditeForm = new FormGroup({
      'recipeName': new FormControl(recipeName, Validators.required),  
      'recipeImg': new FormControl(recipeImg, Validators.required),
      'recipeDesc': new FormControl(recipeDesc, Validators.required),
      'ingredients': recipeIngredients
    })
  }

  getFormArrayControl() {
    return (this.recipeEditeForm.get('ingredients') as FormArray)!.controls
  }

  onAddIng() {
    const newFormGroup = new FormGroup({
      'ingName': new FormControl(null, Validators.required),
      'ingAmount': new FormControl(null, [Validators.required, Validators.min(1)])
    });

    (this.recipeEditeForm.get('ingredients') as FormArray).push(newFormGroup)
  }

  onSubmit() {
    const recipe = new Recipe(
      this.recipeEditeForm.value['recipeName'],
      this.recipeEditeForm.value['recipeDesc'],
      this.recipeEditeForm.value['recipeImg'],
      this.recipeEditeForm.value['ingredients'])
    if(this.editingMode) {
      this.recipeService.updateRecipe(this.id, recipe)
    }else {
      this.recipeService.addRecipe(recipe)
    }
    this.recipeEditeForm.reset();
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  
  onCancel() {
    this.recipeEditeForm.reset()
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredent(ingredientIndex: number) {
    (this.recipeEditeForm.get('ingredients') as FormArray).removeAt(ingredientIndex);
    this.recipeService.deleteIngredient(this.id, ingredientIndex);
  }

}