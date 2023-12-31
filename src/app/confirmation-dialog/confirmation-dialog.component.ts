import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Translation } from '../translation';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatDialogModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  sourcePhrase:string = "Source";
  translatedPhrase:string = "Translated";
 
  form = new FormGroup({
    sourcePhraseControl: new FormControl(''),
    translatedPhraseControl: new FormControl('')
  });

  constructor(
      @Inject(MAT_DIALOG_DATA) data: Translation,
      @Inject(MAT_DIALOG_DATA) title:string,
      private dialogRef: MatDialogRef<ConfirmationDialogComponent>
  ){
    this.sourcePhrase = data.sourcePhrase;
    this.translatedPhrase = data.translatedPhrase;
  }

  public confirmMessage:string = "";

  yes(){

    this.dialogRef.close(true);
  }

  no(){
    this.dialogRef.close(false);
  }
}
