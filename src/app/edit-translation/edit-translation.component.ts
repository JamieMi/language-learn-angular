import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogConfig } from "@angular/material/dialog";
import { Translation } from '../translation';

import {MatInputModule } from "@angular/material/input";
import { Inject } from '@angular/core';

@Component({
  selector: 'app-edit-translation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-translation.component.html',
  styleUrls: ['./edit-translation.component.scss']
})

export class EditTranslationComponent{
  @Input() source!: string;
  @Input() translated!: string;
  
  constructor( @Inject(MAT_DIALOG_DATA) public data : string ) { // TO DO: don't know how to define the actual type
    alert(data);
    this.sourceTextControl.setValue(data);
    //this.translatedTextControl.setValue(data.translatedPhrase);

  }

  // For an ordinary component:
  sourceTextControl = new FormControl('');
  translatedTextControl = new FormControl('');
}
  