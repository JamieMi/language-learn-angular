import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import { Translation } from '../translation';
import {MatInputModule } from "@angular/material/input";
import { Inject } from '@angular/core';
import {MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';

import { MomentDateAdapter } from '@angular/material-moment-adapter'; // needed in addition to MAT_DATE_LOCALE, MAT_DATE_FORMATS & DateAdapter to switch date format to the one the rest of the planet uses

const NORMAL_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'app-edit-translation',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule,MatFormFieldModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: NORMAL_DATE_FORMAT }],
  templateUrl: './edit-translation.component.html',
  styleUrls: ['./edit-translation.component.scss']
})

export class EditTranslationComponent implements OnInit{
  sourcePhrase!:string;
  translatedPhrase!:string;

  date = new Date();
  minDate = new Date(2014, 0, 1);
  maxDate = new Date(2030,0,1);

  form = new FormGroup({
    sourcePhraseControl: new FormControl(''),
    translatedPhraseControl: new FormControl('')
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) data: Translation,
    private dialogRef: MatDialogRef<EditTranslationComponent>
  ){
    this.sourcePhrase = data.sourcePhrase;
    this.translatedPhrase = data.translatedPhrase;
    this.date = data.createdTime;
  }
 
  ngOnInit() {
    this.form.patchValue({
      sourcePhraseControl: this.sourcePhrase,
      translatedPhraseControl: this.translatedPhrase
    }
    );
  }
  
  save() {
    // Seems odd that we can't use the same form control method for the date
    var modifiedTranslation = new Translation();
    modifiedTranslation.sourcePhrase = this.form.value.sourcePhraseControl!;
    modifiedTranslation.translatedPhrase =this.form.value.translatedPhraseControl!;
    
    // Any use of the DatePicker corrupts the date format, whether we save or not.
    // The Epoch time value is still correct - it just seems to be *$%£ing the type
    // ... so we have to recreate that...
    this.date = new Date(this.date);

    modifiedTranslation.createdTime = this.date;    
    this.dialogRef.close(modifiedTranslation);
  }

  close() {
      this.dialogRef.close();
  }
}
  