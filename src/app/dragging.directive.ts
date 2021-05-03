import { Directive, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[appDragging]"
})
export class DraggingDirective {
  private elementContent: { [key: string]: string } | undefined;

  @Input()
  set appDragging(content: { [key: string]: string }) {
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
