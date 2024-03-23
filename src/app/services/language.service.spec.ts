/*import { TestBed } from '@angular/core/testing';

import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
*/
// Additional imports for testing

import { LanguageService } from './language.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Translation } from '../translation';

describe('LanguageService', () => {
  let service: LanguageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LanguageService]
    });
    service = TestBed.inject(LanguageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should fetch translations', () => {
    const dummyTranslations: Translation[] = [];

    let dummyText = [{
      sourcePhrase:"No, I want to play it safe / rather be safe than sorry",
      translatedPhrase:"Nein, ich gehe auf Nummer sicher"
    },
    {
      sourcePhrase:"supernatural",
      translatedPhrase:"übernatürlich"
    }];

    // Define your translations
    //const translations: Translation[] = [];
      
    // Loop through the first two items in the translations array
    for (let i = 0; i < 2; i++) {
      var translation = new Translation();
      translation.sourcePhrase = dummyText[i].sourcePhrase;
      translation.translatedPhrase = dummyText[i].translatedPhrase;
      translation.done = false;
      dummyTranslations.push(translation);
    };

    service.getTranslations().subscribe(translations => {
      expect(translations.length).toBe(2);
      expect(translations).toEqual(dummyTranslations);
    });

    const req = httpMock.expectOne(service.translationUrlValue);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTranslations);
  });
/*
  it('should fetch a single translation', () => {
    const dummyTranslation = new Translation();
    //const dummyTranslation: Translation = { id: 1, text: 'Hello', language: 'English' };

    service.getTranslation(1).subscribe(translation => {
      expect(translation).toEqual(dummyTranslation);
    });

    const req = httpMock.expectOne(`${service.translationUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTranslation);
  });

  it('should delete a translation', () => {
    const dummyTranslation: Translation = { id: 1, text: 'Hello', language: 'English' };

    service.deleteTranslation(1).subscribe(translation => {
      expect(translation).toEqual(dummyTranslation);
    });

    const req = httpMock.expectOne(`${service.translationUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(dummyTranslation);
  });

  it('should search translations', () => {
    const dummyTranslations: Translation[] = [
      { id: 1, text: 'Hello', language: 'English' },
      { id: 2, text: 'Hola', language: 'Spanish' }
    ];

    service.searchTranslations('Hello').subscribe(translations => {
      expect(translations.length).toBe(2);
      expect(translations).toEqual(dummyTranslations);
    });

    const req = httpMock.expectOne(`${service.translationUrl}/?name=Hello`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTranslations);
  });*/
});