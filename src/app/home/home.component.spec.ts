import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomeComponent]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });  

  it("throwing error", () => {
    expect(() => component.throwError()).toThrow();
    expect(() => component.throwError()).toThrow(Error);

    expect(() => component.throwError()).not.toThrow('A particular error');
    expect(() => component.throwError()).toThrow(/invoked/);
  });
});
