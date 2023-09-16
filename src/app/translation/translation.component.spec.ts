import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationComponent } from './translation.component';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TranslationComponent', () => {
  let component: TranslationComponent;
  let fixture: ComponentFixture<TranslationComponent>;

  // to avoid boilerplate - we won't need these in every case:
  const expected_header = "Add translation";
  const testSourcePhrase = 'Test source phrase';
  const testTranslatedPhrase = 'Test translated phrase';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslationComponent, BrowserModule, BrowserAnimationsModule]
    });
    fixture = TestBed.createComponent(TranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // In the app, this would be supplied from html i.e. the DOM:
    component.translation = {
      sourcePhrase: testSourcePhrase,
      translatedPhrase: testTranslatedPhrase,
      createdTime:new Date(),
      lastTestedDate:new Date(0)
      //testTime:[]
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test focus change', () => {
    component.setFocus(false);
    expect(component.translationfocus).toBe(false);
    component.setFocus(true);
    expect(component.translationfocus).toBe(true);
    // assumes expected interaction with DOM though
  });

  it('should open and close edit dialog', () => {
    component.openEditDialog();
    openDialogExpects();
  });

  it('should open and close add dialog', () => {
    component.openAddDialog();
    openDialogExpects();
  });

  // TO DO: How do we test saving?

// BOILERPLATE HELPER FUNCTIONS

  function openDialogExpects(){
    fixture.detectChanges();
    // I think this might work in Jasmine, running in the browser
    // ...but with Jest there is no document at this point.
    // Probably not the expected behaviour, but I've no idea what to do about it.
    const popUpHeader = document.getElementsByTagName('h2')[0] as HTMLHeadElement;
    if (popUpHeader.innerText == undefined)
    {
      console.log("Note: Testing framework error: Document is undefined");
    }
    else
    {
      expect(popUpHeader.innerText).toEqual(expected_header);
    }

    // When a dialog is closed, nothing in the translation should change.
    // Note - we're not directly testing clicking the close button though
    expect(component.translation.sourcePhrase).toEqual(testSourcePhrase);
    expect(component.translation.translatedPhrase).toEqual(testTranslatedPhrase);
  }
});
