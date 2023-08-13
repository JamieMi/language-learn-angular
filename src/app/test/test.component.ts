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

  
  @Output() addTranslationEvent = new EventEmitter<Translation>();
  
  constructor(public dialog: MatDialog) {}

  public _reload = true;

  private reload() {
      setTimeout(() => this._reload = false);
      setTimeout(() => this._reload = true);
  }
  
  
  // Takes a boolean, because workarounds for scope limitations of enums in JS are just too ugly.
  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let translation: Translation = {
      sourcePhrase:'',
      translatedPhrase:'',
      createdTime:new Date(),
      testTime:[]
    };
      
    dialogConfig.data = {
//        id: 1,
      title: 'Add translation',
      data: translation
    }

    const dialogRef = this.dialog.open(EditTranslationComponent, dialogConfig.data)
    
    dialogRef.afterClosed().subscribe(
      data => (this.update(data))
      
    );    
  };

  update(data:Translation){
    console.log("got result");
    console.log(data);
    this.addTranslationEvent.emit(data);
  }
}
