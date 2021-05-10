import { HttpClientModule } from "@angular/common/http";
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
import { GetValuesPipe } from "./get-values.pipe";
import { EditFormModule } from "./module-edit-form/module-edit-form.module";
import { StudentsLocalService } from "./services/students-local.service";
import { StudentsServerService } from "./services/students-server.service";
import { StudentsService } from "./services/students.service";
import { ToggleIconDirective } from "./toggle-icon.directive";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { ActivatedRoute } from "@angular/router";
import { GetScoresPipe } from './get-scores.pipe';


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
    GetValuesPipe,
    PageNotFoundComponent,
    HomeComponent,
    GetScoresPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    EditFormModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: StudentsService,
      useFactory: studentsServiceFactory,
      deps: [StudentsLocalService, StudentsServerService, ActivatedRoute],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function studentsServiceFactory(studentsLocalService: StudentsLocalService, studentsServerService: StudentsServerService, activeRoute: ActivatedRoute): StudentsService {
  const paramDebug = activeRoute.snapshot.firstChild?.queryParams["debug"];
  console.log("param debug", paramDebug);
  if (paramDebug) {
    console.log("local service", studentsLocalService);
    return studentsLocalService;
  } else {
    console.log("server service", studentsServerService);
    return studentsServerService;
  }
};


