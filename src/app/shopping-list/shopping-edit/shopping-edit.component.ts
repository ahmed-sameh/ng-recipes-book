import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shoppinList.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('shoppingListEditForm', {static: true}) editFormRef! : NgForm;
  editMood = false;
  editingSub!: Subscription;
  ingredientId!: number;

  constructor(private shoppingService: ShoppingListService) {
    this.editingSub = shoppingService.ingredientItemEdit.subscribe( ingredientIndex => {
      this.editMood = true;
      this.ingredientId = ingredientIndex;
      const ingredient = this.shoppingService.getSingleIngredient(this.ingredientId);
      this.editFormRef.form.patchValue({
        'ingName': ingredient.name,
        'ingAmount': ingredient.amount
      })
    })
  }

  ngOnInit(): void {}
  
  
  onSubmit() {
    if(this.editMood) {
      const newIng = new Ingredient(this.editFormRef.value.ingName,this.editFormRef.value.ingAmount)
      this.shoppingService.updateSingleIngredient(this.ingredientId, newIng);
    }else {
      this.shoppingService.addIngredient(new Ingredient(this.editFormRef.value.ingName, this.editFormRef.value.ingAmount))
    }
    this.editMood = false;
    this.editFormRef.reset()
  }

  onDelete() {
    this.shoppingService.onDeleteIng(this.ingredientId)
  }
  
  onClear() {
    this.editMood = false;
    this.editFormRef.reset()
  }
  
  
  ngOnDestroy(): void {
      this.editingSub.unsubscribe()
  }

}
