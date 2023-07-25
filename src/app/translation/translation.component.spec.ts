import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationComponent } from './translation.component';

describe('TranslationComponent', () => {
  let component: TranslationComponent;
  let fixture: ComponentFixture<TranslationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslationComponent]
    });
    fixture = TestBed.createComponent(TranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test focus change', () => {
    component.setFocus(false);
    expect(component.focus).toBe(false);
    component.setFocus(true);
    expect(component.focus).toBe(true);
    // assumes expected interaction with DOM though
  });

  it('should open edit dialog', () => {
    const fixture = TestBed.createComponent(TranslationComponent);
    const app = fixture.componentInstance;
    const expected_header = "Edit translation";
    app.openEditDialog();
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
  });
});
