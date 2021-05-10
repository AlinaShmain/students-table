import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from "@angular/core";
import { Student } from "./services/student";

@Directive({
  selector: "[appDropZone]"
})
export class DropZoneDirective {

  options: DroppableOptions | undefined;

  @HostBinding("class.drop-zone-active")
  active: boolean = false;

  @Input()
  set appDropZone(options: DroppableOptions) {
    if (options) {
      this.options = options;
    }
  }

  @Output()
  onDroppableComplete: EventEmitter<{ data: Student, zone: string }> = new EventEmitter<{ data: Student, zone: string }>();

  @HostListener("drop", ["$event"])
  onDrop(event: DragEvent): void {
    event.preventDefault();

    this.active = false;

    this.handleDrop(event);
  }

  @HostListener("dragover", ["$event"])
  onDragOver(event: DragEvent): void {
    // console.log("drag over");
    event.stopPropagation();
    event.preventDefault();
    this.active = true;
  }

  @HostListener("dragleave", ["$event"])
  onDragLeave(event: DragEvent): void {
    // console.log("drag leave");
    this.active = false;
  }

  private handleDrop(event: DragEvent): void {
    if (event && event.dataTransfer) {
      const data = JSON.parse(event.dataTransfer.getData("Text"));
      if (this.options) {
        this.onDroppableComplete.emit({
          data: data,
          zone: this.options.zone
        });
      }
    }
  }
}
export interface DroppableOptions {
  data: { [key: string]: string };
  zone: string;
}
