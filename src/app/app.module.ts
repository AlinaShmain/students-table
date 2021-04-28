import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ComponentFilterComponent } from "./component-filter/component-filter.component";
import { PopupComponent } from "./component-popup/component-popup.component";
import { EditFormModule } from "./module-edit-form/module-edit-form.module";

@NgModule({
  declarations: [
    AppComponent,
    ComponentFilterComponent,
    PopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    EditFormModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
