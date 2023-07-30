import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogConfig, MatDialogActions, MatDialogModule } from "@angular/material/dialog";
import { Translation } from '../translation';

import {MatInputModule } from "@angular/material/input";
import { Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-edit-translation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDialogModule],
  templateUrl: './edit-translation.component.html',
  styleUrls: ['./edit-translation.component.scss']
})

export class EditTranslationComponent implements OnInit{
  sourcePhrase!:string;
  translatedPhrase!:string;

  form = new FormGroup({
    sourcePhraseControl: new FormControl(''),
    translatedPhraseControl: new FormControl('')
  });

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: Translation,
    private dialogRef: MatDialogRef<EditTranslationComponent>
  ){
    this.sourcePhrase = data.sourcePhrase;
    this.translatedPhrase = data.translatedPhrase;
  }
 
  ngOnInit() {
    this.form.setValue({
      sourcePhraseControl: this.sourcePhrase,
      translatedPhraseControl: this.translatedPhrase,
    }
    // obscure fact the tutorials hide from you: setValue must update everything, not just part of the form
    );

  }
  
  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
      this.dialogRef.close();
  }
}
  