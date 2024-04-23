import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Translation } from '../translation';
import { TranslationComponent } from '../translation/translation.component';
import { TestComponent } from '../test/test.component';
import { LanguageService } from '../services/language.service';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { EditTranslationComponent } from '../edit-translation/edit-translation.component';
import { DeckDialogComponent } from '../deck-dialog/deck-dialog.component';
import { throwError } from 'rxjs';
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslationComponent, TestComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  translationList: TranslationComponent[] = [];
  displayTestTools:boolean = false;
  numDisplayed:number = 0;
  numTotal:number = 0;
  deck:string = "Unsaved deck";

  constructor(private languageService: LanguageService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getTranslations();
  }

  getTranslations(): void{
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
  }

  onAdd(){
    const dialogConfig = new MatDialogConfig();

    // use edit dialog in addition mode
    dialogConfig.data = {
      disableClose: true,
      autoFocus: true,
      title: 'Add translation'
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
          decks: decks
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
    });
  }

  onOldFileLoad(){
    this.languageService.loadOldFile();
  }

  throwError() {
    throw new Error('an error has been invoked');
  }
}
