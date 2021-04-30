import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getValuesByKey'
})
export class GetValuesByKeyPipe implements PipeTransform {

  transform(values: { [key: string]: string; }[], key: string): number[] {

    let filteredValues: number[] = [];

    values.forEach((value) => {
      const valueNum = Number.parseFloat(value[key]);
      filteredValues.push(valueNum);
    });
    
    return filteredValues;
  }

}
