import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTranslationComponent } from './edit-translation.component';

describe('EditTranslationComponent', () => {
  let component: EditTranslationComponent;
  let fixture: ComponentFixture<EditTranslationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditTranslationComponent]
    });
    fixture = TestBed.createComponent(EditTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
