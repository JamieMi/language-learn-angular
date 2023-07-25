import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogConfig, MatDialogActions, MatDialogModule } from "@angular/material/dialog";
import { Translation } from '../translation';

import {MatInputModule } from "@angular/material/input";
import { Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-edit-translation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatDialogModule],
  templateUrl: './edit-translation.component.html',
  styleUrls: ['./edit-translation.component.scss']
})

export class EditTranslationComponent implements OnInit{
  
  form!: FormGroup;
  //description!:string;
  // For an ordinary component:
  sourceTextControl = new FormControl('');
  translatedTextControl = new FormControl('');
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditTranslationComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ){
    //this.description = data.description;
    this.sourceTextControl.setValue(data.sourcePhrase);
    this.translatedTextControl.setValue(data.translatedPhrase);
  }
 
  // Doesn't appear to be a point to this yet.
  ngOnInit() {
    this.form = this.fb.group({
       // description: [this.description, []]
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
      this.dialogRef.close();
  }
}
  