import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertOneToTen'
})
export class ConvertOneToTenPipe implements PipeTransform {
  oneToFiveScale = 5;
  oneToTenScale = 10;

  transform(value: string): string {
    const valueNum = Number.parseFloat(value);

    if (valueNum < 4) { return "неудовлетворительно"; }

    return (valueNum * this.oneToTenScale / this.oneToFiveScale).toString();
  }

}
