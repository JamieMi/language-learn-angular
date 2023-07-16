import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [AppComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'language-learn'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('language-learn');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    /*
    expect(compiled.querySelector('.content span')?.textContent).toContain('Language Learn');
    */
  });
  
  //Exact match
  it('two plus two is four', () => {
    expect(2+2).toBe(4);
  });
   
  //Object testing
  it('Object values', () => {
    const data = {name: "Something"};
    expect(data).toEqual({name: "Something"});
  });

  // Truthiness
  it('null', () => {
    const n = null;
    //expect(componentname.n).toBeNull();
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
  });

  it('zero', () => {
    const z = 0;
    expect(z).not.toBeNull();
    expect(z).toBeDefined();
    expect(z).not.toBeUndefined();
    expect(z).not.toBeTruthy();
    expect(z).toBeFalsy();
  });

  it("two plus two", () => {
    const value = 2 + 2;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBe(4);
    expect(value).toEqual(4);
  });

  it("floating point numbers",() => {
    const value = 0.1 + 0.2;
    expect(value).toBeCloseTo(0.3);
  });

  // strings
  it("No i in team", () =>{
    expect("team").not.toMatch(/i/);
  });

  it("but we go in weeding", () => {
    expect("weeding").toMatch(/we/);
  });

  // arrays and iterables

  it("the shopping list contains milk",() => {
    const shoppingList = [
      'trash bags',
      'paper towels',
      'bread',
      'milk'
    ];
    expect(shoppingList).not.toContain('Milk');
    expect(new Set(shoppingList)).not.toContain('Milk');
  });

});
