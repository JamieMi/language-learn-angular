import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Translation } from '../translation'

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    console.log("CREATING DB");
    const translations: Translation[] = [];

    var phrases = [
      {
        sourcePhrase:"No, I want to play it safe / rather be safe than sorry",
        translatedPhrase:"Nein, ich gehe auf Nummer sicher"
      },
      {
        sourcePhrase:"supernatural",
        translatedPhrase:"übernatürlich"
      },
      {
        sourcePhrase:"to level, flatten",
        translatedPhrase:"ebnen"
      },
      {
        sourcePhrase:"Don't bother",
        translatedPhrase:"Lass es"
      },
      {
        sourcePhrase:"I know from empirical view/observations/contemplation",
        translatedPhrase:"Ich weiß aus empirischer Anschauung"
      },
      {
        sourcePhrase:"to be on the verge, on the brink, about to",
        translatedPhrase:"stehen kurz vor"
      },
      {
        sourcePhrase:"Nothing I had seen of her so far was able to nourish the illusion that the sacred fire of poetry blazed in her",
        translatedPhrase:"Nichts, was ich bisher von ihr gesehen hatte, vermochte die Illusion zu nähren, in ihr lodere das heilige Feuer der Dichtkunst"
      },
      {
        sourcePhrase:"to disarm",
        translatedPhrase:"entwaffnen"
      },
      {
        sourcePhrase:"- How you doing? - Still trapped on the surface of a sphere.",
        translatedPhrase:"- Wie geht's? - Auf der Oberfläche einer Kugel gefangen"
      },
      {
        sourcePhrase:"I'll throw paper planes at whoever I please",
        translatedPhrase:"Ich werfe Papierflieger auf wen ich will"
      }
    ]

    let id:number = 10;
    phrases.forEach ((item, index) => {
      var translation = new Translation();
      translation.sourcePhrase = item.sourcePhrase;
      translation.translatedPhrase = item.translatedPhrase;
      translation.createdTime = new Date();
      translation.done = false;
      translation.id = ++id;
      translations.push(translation);
    });

    return {translations};
  }

  // Overrides the genId method to ensure that a translation always has an id.
  // If the translation array is empty,
  // the method below returns the initial number (11).
  // if the translation array is not empty, the method below returns the highest
  // translation id + 1.

  genId(translation: Translation[]): number {
    let id:number = translation.length > 0 ? Math.max(...translation.map(translation => translation.id)) + 1 : 11;
    console.log("genID: Id:", id);
    return id;
  }
}
