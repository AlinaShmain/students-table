import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { StudentsService } from '../services/students.service';

@Injectable()
export class EditGuard implements CanActivate {

  constructor(private studentsService: StudentsService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const studentToEdit = this.studentsService.getStudentToEdit();

    return studentToEdit && studentToEdit.averageScore === "5" ? false : true;
  }

}
