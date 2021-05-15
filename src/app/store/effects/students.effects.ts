import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Student } from "src/app/services/student";
import { StudentsService } from "src/app/services/students.service";
import { StudentsApiActions, StudentsPageActions } from "../actions";

@Injectable()
export class StudentsEffects {

    constructor(private actions$: Actions, private studentsService: StudentsService) { }

    loadStudents$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StudentsPageActions.loadStudents),
            mergeMap(() =>
                this.studentsService.getStudents().pipe(
                    map((students: Student[]) =>
                        // mergeMap((students: Student[]) => of(
                        StudentsApiActions.studentsLoadedSuccess({
                            students: students
                        }),
                        // StudentsPageActions.setBufferStudents({
                        //     bufferStudents: students
                        // })
                        // )),
                    ),
                    catchError((error: Error) => of(StudentsApiActions.studentsLoadedError({ error }))),
                )),
        ),
    );

    addStudent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StudentsPageActions.addStudent),
            mergeMap(({ student }) =>
                this.studentsService.addStudent(student).pipe(
                    map(() => StudentsApiActions.studentAddedSuccess({ student })),
                    catchError((error: Error) => of(StudentsApiActions.studentAddedError({ error }))),
                ),
            ),
        ),
    );

    deleteStudent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StudentsPageActions.deleteStudent),
            mergeMap(({ student }) =>
                this.studentsService.deleteStudent(student).pipe(
                    map(() => StudentsApiActions.studentDeletedSuccess({ student })),
                    catchError((error: Error) => of(StudentsApiActions.studentDeletedError({ error }))),
                ),
            ),
        ),
    );

    editStudent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StudentsPageActions.editStudent),
            mergeMap(({ student }) =>
                this.studentsService.editStudent(student).pipe(
                    map(() => StudentsApiActions.studentEditedSuccess({ student })),
                    catchError((error: Error) => of(StudentsApiActions.studentEditedError({ error }))),
                ),
            ),
        ),
    );

}
