import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Translation } from '../translation';
import { MatDialog, MatDialogConfig, MatDialogModule } from "@angular/material/dialog";
import { EditTranslationComponent } from '../edit-translation/edit-translation.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { LanguageService } from '../services/language.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-translation',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatDatepickerModule, DatePipe],
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss'],
})
export class TranslationComponent {

  static darkMode:boolean = false;

  @Input() translation = new Translation;
  @Input() translationfocus:boolean=false;  
  @Input() done:boolean=false;
  @Output() deletionTranslationEvent = new EventEmitter<number>();
  @Output() editTranslationEvent = new EventEmitter<Translation>();
  
  constructor(private languageService: LanguageService, public dialog: MatDialog) {
  }

  get darkMode() {
    return TranslationComponent.darkMode;
  }

  openEditDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      disableClose: true,
      autoFocus: true,
      title: 'Edit translation',
      data: {
      translation:this.translation,
      darkMode: this.darkMode}
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
      data: {
        translation:this.translation,
        darkMode: this.darkMode
      }
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
      this.editTranslationEvent.emit(data);
      //this.languageService.updateTranslation(data);
      this.done = !this.translation.checkDue();  
    }
  }

  checkDue(){
    this.done = !this.translation.checkDue();
  }

  setFocus(setF:boolean){
    this.translationfocus = setF;
  };
}
