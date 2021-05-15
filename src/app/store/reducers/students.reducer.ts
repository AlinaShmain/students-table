import { createReducer, on } from "@ngrx/store";
import {
    StudentsApiActions, StudentsPageActions,
} from "../actions";
import { initialStudentsState } from "../state/app.state";

export const studentsReducer = createReducer(initialStudentsState,
    on(StudentsPageActions.loadStudents, (state) => ({
        ...state,
        loading: true,
    })),
    on(StudentsApiActions.studentsLoadedSuccess, (state, { students }) => ({
        ...state,
        loading: false,
        loaded: true,
        students: students,
        bufferStudents: students,
        studentsLength: students.length
    })),
    on(StudentsApiActions.studentsLoadedError, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(StudentsPageActions.addStudent, (state, { student }) => ({
        ...state,
    })),
    on(StudentsApiActions.studentAddedSuccess, (state, { student }) => ({
        ...state,
        students: [...state.students, student],
        bufferStudents: [...state.bufferStudents, student],
        studentsLength: state.students.length + 1
    })),
    on(StudentsApiActions.studentAddedError, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(StudentsPageActions.deleteStudent, (state, { student }) => ({
        ...state
    })),
    on(StudentsApiActions.studentDeletedSuccess, (state, { student }) => ({
        ...state,
        students: state.students.filter(({ id }) => id !== student.id),
        bufferStudents: state.bufferStudents.filter(({ id }) => id !== student.id),
        studentsLength: state.students.length - 1
    })),
    on(StudentsApiActions.studentDeletedError, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(StudentsPageActions.editStudent, (state, { student }) => ({
        ...state
    })),
    on(StudentsApiActions.studentEditedSuccess, (state, { student }) => ({
        ...state,
        students: state.students.map((value) => value.id === student.id ? student : value),
        bufferStudents: state.bufferStudents.map((value) => value.id === student.id ? student : value)
    })),
    on(StudentsApiActions.studentEditedError, (state, { error }) => ({
        ...state,
        error: error
    })),
    on(StudentsPageActions.selectStudent, (state, { student }) => ({
        ...state,
        selectedStudent: student
    })),
    on(StudentsPageActions.setStudentsBuffer, (state, { bufferStudents }) => ({
        ...state,
        bufferStudents: bufferStudents
    })),
);
