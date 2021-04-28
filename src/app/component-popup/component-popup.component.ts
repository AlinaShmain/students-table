import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from "@angular/core";

@Component({
  selector: "app-popup",
  templateUrl: "./component-popup.component.html",
  styleUrls: ["./component-popup.component.css"]
})
export class PopupComponent implements OnInit {
  @Output()
  emitDelete: EventEmitter<{ [key: string]: string }> = new EventEmitter<{ [key: string]: string }>();
  @Output()
  emitEditRow: EventEmitter<{ currentRow: { [key: string]: string } | undefined, editedRow: { [key: string]: string } | undefined }> =
    new EventEmitter<{ currentRow: { [key: string]: string } | undefined, editedRow: { [key: string]: string } | undefined }>();
  @Output()
  emitAddRow: EventEmitter<{ [key: string]: string }> = new EventEmitter<{ [key: string]: string }>();

  isOpen: boolean = false;
  tableRow: { [key: string]: string } | undefined;

  isOpenEditContent: boolean = false;
  isOpenCreateContent: boolean = false;
  isOpenDeleteContent: boolean = false;

  ngOnInit(): void {
  }

  toggleModule(nameBtn: string, row?: { [key: string]: string }): void {
    this.isOpen = !this.isOpen;
    if (row) {
      this.tableRow = row;
    }
    if (nameBtn === "edit") {
      this.isOpenEditContent = true;
    } else if (nameBtn === "create") {
      this.isOpenCreateContent = true;
    } else if (nameBtn === "delete") {
      this.isOpenDeleteContent = true;
    }
  }

  closeModule(): void {
    this.isOpen = !this.isOpen;
    this.isOpenCreateContent = false;
    this.isOpenEditContent = false;
  }

  delete(): void {
    console.log("delete");
    this.emitDelete.emit(this.tableRow);
    this.closeModule();
  }

  edit(data: { currentRow: { [key: string]: string } | undefined, editedRow: { [key: string]: string } | undefined }): void {
    console.log("edit");
    // console.log(data.editedRow);
    // console.log(data.currentRow);
    this.emitEditRow.emit(data);
    this.closeModule();
  }

  add(row: { [key: string]: string }): void {
    // console.log("add popup");
    // console.log(row);
    this.emitAddRow.emit(row);
    this.closeModule();
  }
}
