import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Translation } from '../translation';
import { EditTranslationComponent } from '../edit-translation/edit-translation.component';

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
  @Output() refreshFromDBEvent = new EventEmitter<void>();

  constructor(public dialog: MatDialog) {}

  public _reload = true;
  daysToJump = 1; // for the moment, sufficient to always jump 1 day

  private reload() {
      setTimeout(() => this._reload = false);
      setTimeout(() => this._reload = true);
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

  refreshFromDB(){
    this.refreshFromDBEvent.emit();
  }
}
