import { Pipe, PipeTransform } from "@angular/core";
import { Student } from "./services/student";

@Pipe({
  name: "getScores"
})
export class GetScoresPipe implements PipeTransform {

  transform(values: Student[]): number[] {
    const filteredValues: number[] = [];

    values.forEach((value) => {
      const valueNum = Number.parseFloat(value.averageScore);
      filteredValues.push(valueNum);
    });

    return filteredValues;
  }

}
