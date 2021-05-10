import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PopupComponent } from "./component-popup/component-popup.component";
import { EditGuard } from "./edit-guard/edit-guard";
import { HomeComponent } from "./home/home.component";
import { ComponentFormComponent } from "./module-edit-form/component-form/component-form.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  {
    path: "home",
    component: HomeComponent,
    children: [
      {
        path: "form",
        component: PopupComponent,
        children: [
          { path: "create", component: ComponentFormComponent },
          { path: "edit", component: ComponentFormComponent, canActivate: [EditGuard] },
        ]
      }, 
      {
        path: "delete",
        component: PopupComponent
      }
    ]
  },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/page-not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [EditGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
