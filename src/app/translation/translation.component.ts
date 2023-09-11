import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Translation } from '../translation';
import { MatDialog, MatDialogConfig, MatDialogModule } from "@angular/material/dialog";
import { EditTranslationComponent } from '../edit-translation/edit-translation.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule } from '@angular/material/datepicker';

enum OpenMode {
  ADD,
  EDIT
};


@Component({
  selector: 'app-translation',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatDatepickerModule],
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss'],
})
export class TranslationComponent {
  @Input() translation!: Translation;
  @Input() translationfocus:boolean=false;  
  @Input() due:boolean=false;  
  
  @Output() deletionTranslationEvent = new EventEmitter<Translation>();
  
  lastTestedDate = new Date();
  public done:boolean=false;

  constructor(public dialog: MatDialog) {
    this.lastTestedDate.setDate(this.lastTestedDate.getDate() - 2);
    this.due = true;
  }

  openEditDialog() {
    this.openDialogAsEdit( true );
  }

  openAddDialog(){
    this.openDialogAsEdit( false );
  }

  // Takes a boolean, because workarounds for scope limitations of enums in JS are just too ugly.
  openDialogAsEdit(openEdit : boolean ) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    if (openEdit){ // Edit dialog 
      dialogConfig.data = {
        title: 'Edit translation',
        data: this.translation
      }
    } else { // Add dialog
      dialogConfig.data = {
        title: 'Add translation',
        data: this.translation
      }
    }

    const dialogRef = this.dialog.open(EditTranslationComponent, dialogConfig.data)

    dialogRef.afterClosed().subscribe(
      data => (this.update(openEdit, data))
    );    
  };

  openDeleteDialog(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: 'Delete translation',
      data: this.translation
    }
  

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig.data)

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteTranslation(this.translation);
      }
    });
  }

  deleteTranslation(translation: Translation){
    this.deletionTranslationEvent.emit(translation);
  }

  update ( editing: boolean , data:any){
    if (data != undefined) // i.e. Save, not Close
    {
      if (editing)
      {
        this.translation = data;
        console.log(data.sourcePhrase);
        console.log(this.translation.sourcePhrase);
        console.log(data.createdTime);
        console.log(this.translation.createdTime);
      }
      this.due = this.translation.checkDue();
    }
  }

  editCreationDate(){
  }

  setFocus(setF:boolean){
    this.translationfocus = setF;
  };
}
