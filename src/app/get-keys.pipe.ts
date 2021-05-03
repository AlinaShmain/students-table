import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "getKeys"
})
export class GetKeysPipe implements PipeTransform {

  transform(values: {[key: string]: string}): string[] {
    return Object.keys(values);
  }

}
