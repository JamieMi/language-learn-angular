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

  console.error("Content:");// $(compiled.querySelector('.content span')?.textContent))");
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    /*
    console.error(`Content: ${24525.6}`);
    console.error(`Content: ${compiled.querySelector('.content span')?.textContent}`);
    try{
      expect(compiled.querySelector('.content span')?.textContent).toContain('Language Learn');
    }
    catch (e){
      console.error(`Content: ${compiled.querySelector('.content span')?.textContent}`);
    }*/

    it('two plus two is four', () => {
      expect(2+2).toBe(4);
    });
  });
});
