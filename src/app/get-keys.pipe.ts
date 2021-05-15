import { Pipe, PipeTransform } from "@angular/core";
import { Student } from "./services/student";

@Pipe({
  name: "getKeys"
})
export class GetKeysPipe implements PipeTransform {

  transform(values: Student | { [key: string]: string }): Array<keyof typeof values> {
    return Object.keys(values) as Array<keyof typeof values>;
  }

}
