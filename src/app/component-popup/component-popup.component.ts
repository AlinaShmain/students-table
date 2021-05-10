import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Student } from "../services/student";
import { StudentsService } from "../services/students.service";
import {Location} from '@angular/common';

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

  constructor(private activeRoute: ActivatedRoute, private router: Router, private studentsService: StudentsService, private location: Location) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects)
      }
    })
  }

  ngOnInit(): void {
    console.log("popup");
    const path = this.activeRoute.snapshot.url[0].path;
    // console.log("path", path);
    this.isOpenDeleteContent = path === "delete";
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
      this.router.navigateByUrl('/');
    }
  }

  closeModule(): void {
    this.isOpenDeleteContent = false;
    // this.router.navigateByUrl("/");
    this.goBack();
  }

  onConfirm() {
    let studentToDelete: Student | undefined = this.studentsService.getStudentToEdit();

    if (studentToDelete) {
      this.studentsService.deleteStudent(studentToDelete).pipe(
        takeUntil(this.destroy$)
      ).subscribe(({ id }) => {
        console.log("after delete", id);
        // this.router.navigateByUrl("/");
        this.goBack();
      });
    }
  }

}
