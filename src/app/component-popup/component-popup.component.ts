import { Location } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Student } from "../services/student";
import { StudentsPageActions } from "../store/actions";
import { AppState, selectSelectedStudent } from "../store/state/app.state";

@Component({
  selector: "app-popup",
  templateUrl: "./component-popup.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./component-popup.component.css"]
})
export class PopupComponent implements OnInit, OnDestroy {
  isOpenDeleteContent: boolean = false;

  private destroy$ = new Subject<void>();

  private history: string[] = [];

  private studentToDelete: Student | null = null;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private location: Location, private store: Store<AppState>) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
  }

  ngOnInit(): void {
    console.log("popup");
    const path = this.activeRoute.snapshot.url[0].path;
    this.isOpenDeleteContent = path === "delete";

    this.store.select(selectSelectedStudent).pipe(
      takeUntil(this.destroy$),
    ).subscribe((student) => {
      this.studentToDelete = student;
    });
  }

  ngOnDestroy(): void {
    console.log("unsubsrcibe in popup component");
    this.isOpenDeleteContent = false;
    this.destroy$.next();
    this.destroy$.complete();
  }

  goBack(): void {
    this.history.pop();
    if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl("/");
    }
  }

  closeModule(): void {
    this.isOpenDeleteContent = false;
    this.goBack();
  }

  onConfirm(): void {
    if (this.studentToDelete) {
      this.store.dispatch(StudentsPageActions.deleteStudent({ student: this.studentToDelete }));
      this.goBack();
    }
  }

}
