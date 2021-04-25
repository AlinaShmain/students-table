import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ComponentFilterComponent } from "./component-filter/component-filter.component";
import { ComponentFormComponent } from "./component-form/component-form.component";
import { PopupComponent } from "./component-popup/component-popup.component";

@NgModule({
  declarations: [
    AppComponent,
    ComponentFilterComponent,
    PopupComponent,
    ComponentFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
