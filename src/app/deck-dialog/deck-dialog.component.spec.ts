import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeckDialogComponent } from './deck-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

describe('EditTranslationComponent', () => {
  let component: DeckDialogComponent;
  let fixture: ComponentFixture<DeckDialogComponent>;

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
    fixture = TestBed.createComponent(DeckDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
