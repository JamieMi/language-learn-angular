import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Translation } from '../translation';
import { TranslationComponent } from '../translation/translation.component';
import { TestComponent } from '../test/test.component';
import { LanguageService } from '../services/language.service';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { EditTranslationComponent } from '../edit-translation/edit-translation.component';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslationComponent, TestComponent, ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  translationList: TranslationComponent[] = [];
  displayTestTools:boolean = false;

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
    for (const item of translations)
    {
      let translationComponent = new TranslationComponent(this.languageService, this.dialog);

      item.createdTime = new Date(item.createdTime); // required because JSON conversion doesn't handle the date well
      item.lastTestedDate = new Date(item.lastTestedDate); // required because JSON conversion doesn't handle the date well
      translationComponent.setTranslationInstance(item);
      
      this.translationList.push(translationComponent);
    }
    console.log(translations);
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
      console.log("Adding new translation:"); 
      console.log(data);

      let translationComponent = new TranslationComponent(this.languageService,this.dialog);

      translationComponent.translation = data;
      this.translationList.push(translationComponent);

      this.languageService.addTranslation(data);
    }
  }

  onDone(){
    this.translationList.forEach ((item, index) => {
      if (item.translation.done === false){
        item.translation.lastTestedDate = new Date();
        item.checkDue();
        this.languageService.updateTranslation(item.translation);
      }
    });
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
      item.translation.setCreatedTimeBack(days);
      item.checkDue();
    });
  }

  onCreationTimeForward(days:number){
    this.translationList.forEach( (item, index) => {
      item.translation.setCreatedTimeForward(days);
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

  onRefreshFromDB(){
    console.log("-".repeat(20));
    console.log("Refreshing from DB");
    console.log("-".repeat(20));
    this.getTranslations();
  }

  throwError() {
    throw new Error('an error has been invoked');
  }
}

