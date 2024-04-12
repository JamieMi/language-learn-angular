import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
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



