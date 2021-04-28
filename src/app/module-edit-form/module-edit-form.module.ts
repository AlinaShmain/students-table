import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ComponentFormComponent } from "./component-form/component-form.component";



@NgModule({
  declarations: [ComponentFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [ComponentFormComponent]
})
export class EditFormModule { }
