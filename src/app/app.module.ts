import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ComponentFilterComponent } from "./component-filter/component-filter.component";
import { PopupComponent } from "./component-popup/component-popup.component";
import { EditFormModule } from "./module-edit-form/module-edit-form.module";
import { ToggleIconDirective } from './toggle-icon.directive';
import { HighlightFoundDirective } from './highlight-found.directive';
import { ConvertOneToTenPipe } from './convert-one-to-ten.pipe';
import { GetValuesByKeyPipe } from './get-values-by-key.pipe';
import { CalculateAveragePipe } from './calculate-average.pipe';
import { DraggingDirective } from './dragging.directive';
import { DraggingHandleDirective } from './dragging-handle.directive';
import { DropZoneDirective } from './drop-zone.directive';

@NgModule({
  declarations: [
    AppComponent,
    ComponentFilterComponent,
    PopupComponent,
    ToggleIconDirective,
    HighlightFoundDirective,
    ConvertOneToTenPipe,
    GetValuesByKeyPipe,
    CalculateAveragePipe,
    DraggingDirective,
    DraggingHandleDirective,
    DropZoneDirective,
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
