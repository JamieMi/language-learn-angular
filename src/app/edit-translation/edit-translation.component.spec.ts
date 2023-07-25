import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditTranslationComponent } from './edit-translation.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('EditTranslationComponent', () => {
  let component: EditTranslationComponent;
  let fixture: ComponentFixture<EditTranslationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditTranslationComponent],
      providers : [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ]
    });
    fixture = TestBed.createComponent(EditTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
