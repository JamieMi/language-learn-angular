/*import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed'; //  contains symbols that are used only in Karma tests.
import {MatButtonHarness} from '@angular/material/button/testing';
let loader: HarnessLoader;
let fixture: any;

describe('ConfirmationDialogComponentWithComponentHarness', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({})
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
*/

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;
  let dialogRefMock: { close: jest.Mock };

  beforeEach(async () => {
    dialogRefMock = { close: jest.fn() };

    await TestBed.configureTestingModule({
      declarations: [],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog with true when yes is called', () => {
    component.yes();
    expect(dialogRefMock.close).toHaveBeenCalledWith(true);
  });

  it('should close dialog with false when no is called', () => {
    component.no();
    expect(dialogRefMock.close).toHaveBeenCalledWith(false);
  });
});

