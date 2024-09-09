import { Component, Inject } from '@angular/core';


import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatDialogModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  sourcePhrase:string = "Source";
  translatedPhrase:string = "Translated";
  darkMode:boolean = false;

  constructor(
      @Inject(MAT_DIALOG_DATA) data: any,
      @Inject(MAT_DIALOG_DATA) title:string,
      private dialogRef: MatDialogRef<ConfirmationDialogComponent>
  ){
    this.sourcePhrase = data.translation.sourcePhrase;
    this.translatedPhrase = data.translation.translatedPhrase;
    this.darkMode = data.darkMode;
  }

  public confirmMessage:string = "";

  yes(){

    this.dialogRef.close(true);
  }

  no(){
    this.dialogRef.close(false);
  }
}
