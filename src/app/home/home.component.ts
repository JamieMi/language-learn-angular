import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Translation } from '../translation';
import { TranslationComponent } from '../translation/translation.component';
import { TestComponent } from '../test/test.component';
import { LanguageService } from '../services/language.service';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { EditTranslationComponent } from '../edit-translation/edit-translation.component';
import { DeckDialogComponent } from '../deck-dialog/deck-dialog.component';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslationComponent, TestComponent, MatProgressSpinnerModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  

  translationList: TranslationComponent[] = [];
  displayTestTools:boolean = false;
  numDisplayed:number = 0;
  numTotal:number = 0;
  deck:string = "Unsaved deck";
  darkMode:boolean = false;

  constructor(private languageService: LanguageService, public dialog: MatDialog) {
  }
  ngOnInit(): void {  
    this.getTranslations();
  }

  getTranslations(): void{
    this.startSpinner();
    this.translationList.length = 0;
    this.languageService.getTranslations()
      .subscribe(translations => this.modifyTranslations(translations));
  }

  modifyTranslations(translations: Translation[]){
    this.numDisplayed = 0;
    this.numTotal = translations.length;
    for (const item of translations){
      if (item.checkDue()){
        let translationComponent = new TranslationComponent(this.languageService, this.dialog);      
        translationComponent.translation = item;
        
        this.translationList.push(translationComponent);
        this.numDisplayed++;
      }
    }
    this.languageService.getCurrentDeckName().subscribe(deck => this.deck = deck);
    console.log("stopping timer");
    this.stopSpinner();
  }

  onAdd(){
    const dialogConfig = new MatDialogConfig();

    // use edit dialog in addition mode
    dialogConfig.data = {
      disableClose: true,
      autoFocus: true,
      title: 'Add translation',
      data:{darkMode: this.darkMode}
    }

    const dialogRef = this.dialog.open(EditTranslationComponent, dialogConfig.data)

    dialogRef.afterClosed().subscribe(
      data => (this.updateList(data))
    );    
  }

  updateList (data:Translation){
    if (data != undefined) // i.e. Save, not Close
    {
      let translationComponent = new TranslationComponent(this.languageService,this.dialog);

      translationComponent.translation = data;
      
      this.languageService.addTranslation(translationComponent.translation);
      this.translationList.push(translationComponent);
    }
  }

  onDeck(){
    let decks:string[] = [];
    
    this.languageService.getDeckNames().subscribe(decks => {
      console.log("open Deck dialog");
      const dialogConfig = new MatDialogConfig();

      console.log("decks: ",decks);
      dialogConfig.data = {
        disableClose: true,
        autoFocus: true,
        data:{
          deckName: this.deck,
          decks: decks,
          darkMode: this.darkMode
        }
      }

      const dialogRef = this.dialog.open(DeckDialogComponent, dialogConfig.data)

      dialogRef.afterClosed().subscribe(
        // We just need to know whether the deck needs reloading
        refresh => {
          console.log("deck change: ", refresh)
          this.getTranslations();
        }
      );
    });
  }

  onDone(){
    let updatedTranslations : Translation[] = [];
    this.translationList.forEach ((item, index) => {
      if (item.translation.done === false){
        item.translation.lastTestedDate = new Date();
        item.checkDue();

        updatedTranslations.push(item.translation);
      }
    });
    console.log(`now we submit the batch of ${updatedTranslations.length} updated translations:`);
    this.languageService.updateTranslationBatch(updatedTranslations);
  }

  onDeleteTranslation(id:number){
    const index = this.translationList.findIndex(item => item.translation.id === id);
    if (index !== -1) {
      this.translationList.splice(index, 1);
    }

    this.languageService.deleteTranslation(id);
  }

  onCreationTimeBack(days:number){
    this.translationList.forEach( (item, index) => {
      item.translation.setCreatedDateBack(days);
      item.checkDue();
    });
  }

  onCreationTimeForward(days:number){
    this.translationList.forEach( (item, index) => {
      item.translation.setCreatedDateForward(days);
      item.done = !item.translation.checkDue();
    });
  }

  onTestedTimeBack(days:number){
    this.translationList.forEach( (item, index) => {
      item.translation.setTestedTimeBack(days);
      item.done = !item.translation.checkDue();
    });
  }

  onTestedTimeForward(days:number){
    this.translationList.forEach( (item, index) => {
    item.translation.setTestedTimeForward(days);
    item.done = !item.translation.checkDue();
  });}

  onOldFileLoad(){
    this.languageService.loadOldFile();
  }
  
  startSpinner(){
    document.querySelector('#loading')?.setAttribute('style', 'display: true');
  }

  stopSpinner(){
    document.querySelector('#loading')?.setAttribute('style', 'display: none');
  }

  onToggleDarkMode() {
    this.darkMode = document.body.classList.toggle('dark-mode');
    
    // Ideally we'd be able to access the element of child components, but the Angular method
    // to do this with ViewChild requires a hacky workaround to delay initialisation, which
    // won't work anyway if we'd have to delay binding. So we're using a static flag in each
    // child component.
    TranslationComponent.darkMode = this.darkMode;
    TestComponent.darkMode = this.darkMode;
    
    localStorage.setItem('darkMode', this.darkMode ? 'enabled' : 'disabled');

    /*
    We need to find a place for this:
    // On page load
    document.addEventListener('DOMContentLoaded', (event) => {
      if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
      }
    });
    */
  }
  
  throwError() {
    throw new Error('an error has been invoked');
  }
}
