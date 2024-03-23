import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditTranslationComponent } from './edit-translation.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

describe('EditTranslationComponent', () => {
  let component: EditTranslationComponent;
  let fixture: ComponentFixture<EditTranslationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [BrowserModule, BrowserAnimationsModule, ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls', () => {
    expect(component.form.get('sourcePhraseControl')).toBeTruthy();
    expect(component.form.get('translatedPhraseControl')).toBeTruthy();
  });

  it('should save the translation', () => {
    spyOn(component.dialogRefValue, 'close');
    component.save();
    expect(component.dialogRefValue.close).toHaveBeenCalled();
  });

  it('should close the dialog', () => {
    spyOn(component.dialogRefValue, 'close');
    component.close();
    expect(component.dialogRefValue.close).toHaveBeenCalled();
  });
});
