import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Translation } from '../translation';
import { TranslationComponent } from '../translation/translation.component';
import { TestComponent } from '../test/test.component';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslationComponent, TestComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  translationList?: TranslationComponent[];
  displayTestTools:boolean = false;
  translations: Translation[] = [];

  constructor(private languageService: LanguageService) {
    console.log(this.translations);
  }

  ngOnInit(): void {
    this.getTranslations();
  }

  getTranslations(): void{
    this.languageService.getTranslations()
      .subscribe(translations => this.modifyTranslations(translations));
  }

  modifyTranslations(translations: any){
    this.translations = translations;
    for (const translation of translations) {
      // TODO: this is not the correct place for unpacking - should be in the service
      translation.createdTime = new Date(Date.parse(translation.createdTime));
      translation.lastTestedDate = new Date(Date.parse(translation.lastTestedDate));
    }

    console.log(translations);
  }

  onAddTranslation(newTranslation:any){
    if (newTranslation != undefined){

      let translation = new Translation();

      translation.createdTime = newTranslation.createdTime;
      translation.lastTestedDate = newTranslation.lastTestedDate;
      translation.sourcePhrase = newTranslation.sourcePhrase;
      translation.translatedPhrase = newTranslation.translatedPhrase;
      this.translations.push(translation);
    }
  }

  onDone(){
    this.translations.forEach ((item, index) => {
      item.done = true;
      item.lastTestedDate = new Date();
    });
  }

  onDeleteTranslation(newTranslation:any){
    this.translations.forEach( (item, index) => {
      if(item === newTranslation) this.translations.splice(index,1);
    });
  }

  onCreationTimeBack(data:any){
    this.translations.forEach( (item, index) => {
      item.setCreatedTimeBack();
      item.done = !item.checkDue();
    });
  }

  onCreationTimeForward(data:any){
    this.translations.forEach( (item, index) => {
      item.setCreatedTimeForward();
      item.done = !item.checkDue();
    });
  }

  onTestedTimeBack(data:any){
    this.translations.forEach( (item, index) => {
      item.setTestedTimeBack();
      item.done = !item.checkDue();
    });
  }

  onTestedTimeForward(data:any){
    this.translations.forEach( (item, index) => {
      item.setTestedTimeForward();
      item.done = !item.checkDue();
    });
  }
  throwError() {
    throw new Error('an error has been invoked');
  }
}

