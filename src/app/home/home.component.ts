import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Translation } from '../translation';
import { TranslationComponent } from '../translation/translation.component';
import { TestComponent } from '../test/test.component';
import { LanguageService } from '../services/language.service';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { EditTranslationComponent } from '../edit-translation/edit-translation.component';
import { throwError } from 'rxjs';
import { from } from 'rxjs';

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
      translationComponent.translation =  Object.assign({}, item); // "{...item} as Translation" also possible for TypeScript
      
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
      let translationComponent = new TranslationComponent(this.languageService,this.dialog);

      translationComponent.translation = data;
      let newId = this.translationList.length > 0 ? Math.max(...this.translationList.map(translation => translation.translation.id)) + 1 : 1;
      translationComponent.translation.id = newId;
    
      this.languageService.addTranslation(translationComponent.translation);
      this.translationList.push(translationComponent);
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
