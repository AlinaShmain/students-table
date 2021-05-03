import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CalculateAveragePipe } from "./calculate-average.pipe";
import { ComponentFilterComponent } from "./component-filter/component-filter.component";
import { PopupComponent } from "./component-popup/component-popup.component";
import { ConvertOneToTenPipe } from "./convert-one-to-ten.pipe";
import { DraggingDirective } from "./dragging.directive";
import { DropZoneDirective } from "./drop-zone.directive";
import { GetKeysPipe } from "./get-keys.pipe";
import { GetValuesByKeyPipe } from "./get-values-by-key.pipe";
import { EditFormModule } from "./module-edit-form/module-edit-form.module";
import { ToggleIconDirective } from "./toggle-icon.directive";


@NgModule({
  declarations: [
    AppComponent,
    ComponentFilterComponent,
    PopupComponent,
    ToggleIconDirective,
    ConvertOneToTenPipe,
    GetValuesByKeyPipe,
    CalculateAveragePipe,
    DraggingDirective,
    DropZoneDirective,
    GetKeysPipe,
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
