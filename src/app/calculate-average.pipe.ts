import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculateAverage'
})
export class CalculateAveragePipe implements PipeTransform {

  transform(values: number[]): number {
    const amount: number = values.length;

    let dict: { [key: number]: number } = {};

    values.forEach((val) => {
      dict[val] = dict[val] + 1 || 1;
    });

    let total = 0;
    for (let key in dict) {
      total += dict[key] * Number.parseFloat(key);
    }

    return total / amount;
  }

}
