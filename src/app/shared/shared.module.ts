import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { SpinnerComponent } from './spinner/spinner.component';



@NgModule({
  declarations: [
    DropdownDirective,
    SpinnerComponent,
    AlertComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    DropdownDirective,
    SpinnerComponent,
    AlertComponent
  ]
})
export class SharedModule { }
