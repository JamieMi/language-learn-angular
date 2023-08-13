import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Translation } from '../translation';

import { TranslationComponent } from '../translation/translation.component';
import { TestComponent } from '../test/test.component';

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

  translations : Translation[] = [
    {
      sourcePhrase:"No, I want to play it safe / rather be safe than sorry",
      translatedPhrase:"Nein, ich gehe auf Nummer sicher",
      createdTime: new Date(),
      testTime: []
    },
    {
      sourcePhrase:"supernatural",
      translatedPhrase:"übernatürlich",
    },
    {
      sourcePhrase:"to level, flatten",
      translatedPhrase:"ebnen",
    },
    {
      sourcePhrase:"Don't bother",
      translatedPhrase:"Lass es",
    },
    {
      sourcePhrase:"I know from empirical view/observations/contemplation",
      translatedPhrase:"Ich weiß aus empirischer Anschauung",
    },
    {
      sourcePhrase:"to be on the verge, on the brink, about to",
      translatedPhrase:"stehen kurz vor",
    },
    {
      sourcePhrase:"Nothing I had seen of her so far was able to nourish the illusion that the sacred fire of poetry blazed in her",
      translatedPhrase:"Nichts, was ich bisher von ihr gesehen hatte, vermochte die Illusion zu nähren, in ihr lodere das heilige Feuer der Dichtkunst",
    },
    {
      sourcePhrase:"to disarm",
      translatedPhrase:"entwaffnen",
    },
    {
      sourcePhrase:"- How you doing? - Still trapped on the surface of a sphere.",
      translatedPhrase:"- Wie geht's? - Auf der Oberfläche einer Kugel gefangen",
    },
    {
      sourcePhrase:"I'll throw paper planes at whoever I please",
      translatedPhrase:"Ich werfe Papierflieger auf wen ich will",
    }
  ];
  
  onAddTranslation(newTranslation:any){
    console.log("home component receives emit");
    
    let translation = new Translation();

    translation.createdTime = new Date();
    translation.testTime = [];
    translation.sourcePhrase = newTranslation.sourcePhraseControl;
    translation.translatedPhrase = newTranslation.translatedPhraseControl;
    console.log(translation);

    this.translations.push(translation);
  }

  throwError() {
    throw new Error('an error has been invoked');
  }

}

