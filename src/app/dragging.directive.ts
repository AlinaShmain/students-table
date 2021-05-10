import { Directive, HostListener, Input } from "@angular/core";
import { Student } from "./services/student";

@Directive({
  selector: "[appDragging]"
})
export class DraggingDirective {
  private elementContent: Student | undefined;

  @Input()
  set appDragging(content: Student) {
    this.elementContent = content;
  }

  @HostListener("dragstart", ["$event"]) onDragStart(event: DragEvent): void {
    // event.stopPropagation();
    // event.preventDefault();
    event.dataTransfer && event.dataTransfer
      .setData("Text"
        , JSON.stringify(this.elementContent));
  }

  @HostListener("dragend", ["$event"]) onDragEnd(event: DragEvent): void {
    // event.stopPropagation();
    // event.preventDefault();
    console.log("drag end", event);
  }
}
