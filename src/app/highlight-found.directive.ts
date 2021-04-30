import { Directive, ElementRef, HostListener, Inject, Input, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appHighlightFound]'
})
export class HighlightFoundDirective {
  private _element: HTMLInputElement;
  @Input('column') column: any;
  foundStudents: Array<{ [key: string]: string }> = [];

  constructor(private renderer: Renderer2, private elementRef: ElementRef, @Inject(DOCUMENT) private document: any) {
    this._element = elementRef.nativeElement as HTMLInputElement;
  }

  get element(): HTMLInputElement { return this._element; }

  @HostListener("keyup") onKey(event: Event) {
    this.foundStudents = [];

    let value = this.element.value.toLowerCase();

    if (value) {
      value = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      // console.log(value);

      // console.log(this.column);

      const regexp = new RegExp(`^${value}`, "g");

      const cellsDom: NodeListOf<HTMLTableCellElement> = this.document.getElementsByTagName("td");
      const cellsArr: Array<HTMLTableCellElement> = Array.from(cellsDom).filter((cell) => (cell.tagName === "TD" && cell.innerText === ""));

      if(cellsArr.length > 0) {
        cellsArr.forEach((cell) => {
          // const value: 
        });
      }

      // const rowsDom: NodeListOf<HTMLTableRowElement> = this.document.getElementsByTagName("tbody")[0].childNodes;
      // const rowsArr: Array<HTMLTableRowElement> = Array.from(rowsDom).filter((row) => (row.tagName === "TR"));
      // console.log(rowsArr);

      // if (rowsArr.length !== 0) {
        // rowsArr.forEach((row) => {
          // const cell: string = row.innerText;
          // console.log(row.childNodes);
          // const columnLowerCase = row[column].toLowerCase().trim();
          //       if (
          //         columnLowerCase.match(regexp)
          //       ) {
          //         this.foundStudents.push(row);
          //       }
        // });
      
    }
  }
}
