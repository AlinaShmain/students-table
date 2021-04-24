import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './component-popup.component.html',
  styleUrls: ['./component-popup.component.css']
})
export class PopupComponent implements OnInit {
@Output()
emitFunctionOfParent: EventEmitter<{ [key: string]: string }> = new EventEmitter<{ [key: string]: string }>();
constructor() { }

  isOpen: boolean = false;
  tableRow:{ [key: string]: string } | undefined;

  ngOnInit(): void {
  }

  toggleModule(row: { [key: string]: string }){
    this.isOpen = !this.isOpen;
    this.tableRow = row;
    
  }

  closeModule(){
    this.isOpen = !this.isOpen;
  }

  delete(){
    this.emitFunctionOfParent.emit(this.tableRow); 
    this.closeModule();
  }

}
