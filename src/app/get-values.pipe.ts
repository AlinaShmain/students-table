import { Pipe, PipeTransform } from '@angular/core';
import { Student } from "./services/student";

@Pipe({
  name: 'getValues'
})
export class GetValuesPipe implements PipeTransform {

  transform(values: Student): string[] {
    return Object.values(values);
  }

}
