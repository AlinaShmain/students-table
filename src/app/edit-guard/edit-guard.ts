import { Injectable, OnInit } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Student } from "../services/student";
import { AppState, selectSelectedStudent } from "../store/state/app.state";

@Injectable()
export class EditGuard implements CanActivate {

  private studentToEdit: Student | null = null;

  constructor(private store: Store<AppState>) {
    this.store.select(selectSelectedStudent).subscribe((student) => {
      this.studentToEdit = student;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.studentToEdit && this.studentToEdit.averageScore === "5" ? false : true;
  }

}
