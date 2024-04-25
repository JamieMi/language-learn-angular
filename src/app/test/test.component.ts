import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  @Output() creationTimeBackEvent = new EventEmitter<number>();
  @Output() creationTimeForwardEvent = new EventEmitter<number>();
  @Output() testedTimeBackEvent = new EventEmitter<number>();
  @Output() testedTimeForwardEvent = new EventEmitter<number>();
  @Output() oldFileLoadEvent = new EventEmitter<void>();

  daysToJump = 1; // for the moment, sufficient to always jump 1 day
  static darkMode:boolean = false;

  get darkMode() {
    return TestComponent.darkMode;
  }

  creationBack(){
    this.creationTimeBackEvent.emit(this.daysToJump);
  }

  creationForward(){
    this.creationTimeForwardEvent.emit(this.daysToJump);
  }

  testedBack(){
    this.testedTimeBackEvent.emit(this.daysToJump);
  }

  testedForward(){
    this.testedTimeForwardEvent.emit(this.daysToJump);
  }
  
  loadOldFile() {
    this.oldFileLoadEvent.emit();
  }
}



