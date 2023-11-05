import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed'; //  contains symbols that are used only in Karma tests.
import {MatButtonHarness} from '@angular/material/button/testing';
let loader: HarnessLoader;
let fixture: any;

describe('ConfirmationDialogComponentWithComponentHarness', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({/*imports: [MyModule], *//*declarations: [ConfirmationDialogComponent]*/})
        .compileComponents();
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    let loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should mark confirmed when ok button clicked', async () => {
    const okButton = await loader.getHarness(MatButtonHarness); // === buttons[0]
    //const okButton = await loader.getHarness(MatButtonHarness.with({selector: '.confirm'});
    expect(fixture.componentInstance.confirmed).toBe(false);
    expect(await okButton.isDisabled()).toBe(false);
    await okButton.click();
    expect(fixture.componentInstance.confirmed).toBe(true);
  });
}

/*
describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfirmationDialogComponent]
    });
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}*/);
