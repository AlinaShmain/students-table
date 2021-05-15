import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { environment } from "src/environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CalculateAveragePipe } from "./calculate-average.pipe";
import { ComponentFilterComponent } from "./component-filter/component-filter.component";
import { PopupComponent } from "./component-popup/component-popup.component";
import { ConvertOneToTenPipe } from "./convert-one-to-ten.pipe";
import { DraggingDirective } from "./dragging.directive";
import { DropZoneDirective } from "./drop-zone.directive";
import { GetKeysPipe } from "./get-keys.pipe";
import { GetScoresPipe } from "./get-scores.pipe";
import { GetValuesByKeyPipe } from "./get-values-by-key.pipe";
import { GetValuesPipe } from "./get-values.pipe";
import { HomeComponent } from "./home/home.component";
import { EditFormModule } from "./module-edit-form/module-edit-form.module";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { StudentsLocalService } from "./services/students-local.service";
import { StudentsServerService } from "./services/students-server.service";
import { StudentsService } from "./services/students.service";
import { StudentsEffects } from "./store/effects/students.effects";
import { studentsReducer } from "./store/reducers/students.reducer";
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
    StoreModule.forRoot({
      students: studentsReducer
    }),
    EffectsModule.forRoot([StudentsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    {
      provide: StudentsService,
      useFactory: studentsServiceFactory,
      deps: [StudentsLocalService, StudentsServerService, ActivatedRoute],
    },
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
  }
  console.log("server service", studentsServerService);
  return studentsServerService;
}


