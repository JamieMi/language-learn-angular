import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import {MatInputModule } from "@angular/material/input";
import { Inject } from '@angular/core';
import {MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';

import { LanguageService } from '../services/language.service';

// From Angular material documentation
//import {MatSelectModule} from '@angular/material/select';
import { Observable, map, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-deck-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule,MatFormFieldModule, MatDialogModule, /*MatDatepickerModule, MatNativeDateModule, */ReactiveFormsModule, MatAutocompleteModule],
  /*providers: [],*/
  templateUrl: './deck-dialog.component.html',
  styleUrls: ['./deck-dialog.component.scss']
})

export class DeckDialogComponent implements OnInit{

  @Output() refreshDeckEvent = new EventEmitter<void>();
  
  deckName!:string;
  decks: string[] = [];
  deckExists: boolean = false;

  filteredOptions: Observable<string[]> | undefined;
  optionCtrl = new FormControl();

  constructor(
    private languageService: LanguageService,
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<DeckDialogComponent>
  ){
    if (data != undefined) 
    {
      this.deckName = data.deckName;
      this.decks = data.decks;
      console.log(data.decks);
    }
    console.log(data);
  }
 
  ngOnInit() {
    this.filteredOptions = this.optionCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
      
    this.optionCtrl.valueChanges.subscribe(value => {
      console.log(`Deck name changed to: ${value}`);
      this.deckName = value;
      
      let deckExists:boolean = this.decks.includes(this.deckName);

      if (this.deckExists != deckExists) {
        this.deckExists = deckExists;

        // for each button with the "toggle" class, toggle disabled status
        let toggleButtons = document.getElementsByClassName('toggle');
        for(let i = 0; i < toggleButtons.length; i++) {
          toggleButtons[i].classList.toggle('disabledbutton');
          toggleButtons[i].toggleAttribute('disabled')
        }
      }

    });

    //if deckName is in decks, then update the control
    console.log(this.decks);
    console.log(this.deckName);
    if (this.decks.includes(this.deckName)) {
      this.optionCtrl.setValue(this.deckName);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.decks.filter(deck => deck.toLowerCase().includes(filterValue));
  }

  get dialogRefValue(): MatDialogRef<DeckDialogComponent> {
    return this.dialogRef;
  }
  
  // Wraps REST-API calls to the service to wait for completion, before closing the dialog
  completeAndClose(func:any) {
    console.log(`function: ${func}`);
    
    func().subscribe({
      complete: () => {
        this.close(true);
      }
    });
  }

  // All modification methods simply return "true" to refresh, if they succeed.
  // In each case, the home component simply reloads to get the correct state.

  openDeck() {
    console.log(`Opening deck: ${this.deckName}`);
    this.completeAndClose(() => this.languageService.openDeck(this.deckName));
  }

  renameDeck() {
    console.log(`Renaming deck to: ${this.deckName}`);
    this.completeAndClose(() => this.languageService.renameDeck(this.deckName));
  }
  
  createDeck() {
    console.log(`Creating deck: ${this.deckName}`);
    this.completeAndClose(() => this.languageService.createDeck(this.deckName));
  }

  deleteDeck() {
    console.log(`Deleting deck: ${this.deckName}`);
    this.completeAndClose(() => this.languageService.deleteDeck(this.deckName));
  }

  close(refresh:boolean) {
      this.dialogRef.close(refresh);
  }
}
  