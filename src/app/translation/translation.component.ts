import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Translation } from '../translation';
import { MatDialog, MatDialogConfig, MatDialogModule } from "@angular/material/dialog";
import { EditTranslationComponent } from '../edit-translation/edit-translation.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { LanguageService } from '../services/language.service';

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
  @Input() translation = new Translation;
  @Input() translationfocus:boolean=false;  
  @Input() due:boolean=false;    
  @Output() deletionTranslationEvent = new EventEmitter<number>();
  
  public done:boolean=false;

  constructor(private languageService: LanguageService, public dialog: MatDialog) {
    this.due = true;
  }

  openEditDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      disableClose: true,
      autoFocus: true,
      title: 'Edit translation',
      data: this.translation
    }

    const dialogRef = this.dialog.open(EditTranslationComponent, dialogConfig.data)

    dialogRef.afterClosed().subscribe(
      data => (this.updateTranslation(data))
    );    
  }

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
    this.deletionTranslationEvent.emit(translation.id);
  }

  updateTranslation ( data:Translation){
    if (data != undefined) // i.e. Save, not Close
    {
      this.translation = data;

      console.log(data.sourcePhrase);
      console.log(this.translation.sourcePhrase);
      console.log(data.createdTime);
      console.log(this.translation.createdTime);
      this.languageService.updateTranslation(data);
      this.due = this.translation.checkDue();  
    }
  }

  setFocus(setF:boolean){
    this.translationfocus = setF;
  };

  setTranslationInstance(translation:Translation)
  {
    //this.translation = translation; // won't work, because the original translation is an object, NOT an instance

    this.translation.sourcePhrase = translation.sourcePhrase;
    this.translation.translatedPhrase = translation.translatedPhrase;
    this.translation.lastTestedDate = translation.lastTestedDate;
    this.translation.createdTime = translation.createdTime;
    this.translation.id = translation.id;
    this.translation.done = translation.done;
  }
}
