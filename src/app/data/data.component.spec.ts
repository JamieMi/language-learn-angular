// using TestBed

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataComponent } from './data.component';
import { HttpErrorResponse } from '@angular/common/http';
import { FakeService } from '../services/fake.service';
import { of, throwError } from 'rxjs';

describe('DataComponent', () => {
  let component: DataComponent;
  let fixture: ComponentFixture<DataComponent>;
  let fakeServiceMock: any;

  // in the example, this already existed:
  beforeEach(async () => {  // original content
    fakeServiceMock = {
      getDataV1 : jest.fn()
    }

    await TestBed.configureTestingModule({ // original content
      declarations: [ DataComponent ], // original content
      providers: [
        {
          provide: FakeService, useValue: fakeServiceMock
        }
      ]
    }) // original content
    .compileComponents(); // original content
  }); // original content

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataComponent]
    });
    fixture = TestBed.createComponent(DataComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges(); // causes DataComponent › should create "TypeError: Cannot read properties of undefined (reading 'subscribe')""
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return serviceData from setServiceData', () => {
    const expRes = {
      name: "Bob"
    };
    jest.spyOn(fakeServiceMock, 'getDataV1').mockReturnValue(of(expRes));
    fixture.detectChanges(); //apparently deprecated, as compensating for bad programming
    expect(component.serviceData.name).toBe(expRes.name);
  });

  it('getServiceData should set errorMessage', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not found'
    });
    jest.spyOn(fakeServiceMock, 'getDataV1').mockReturnValue(throwError(() => errorResponse));
    component.getServiceData();
    expect(component.errorMessage).toBe('Not found');
  });

  it('should return serviceData from setServiceData', () => {
    const expRes = {
      name: "Bob",
      time: 12
    };
    jest.spyOn(fakeServiceMock, 'getDataV1').mockReturnValue(of(expRes));
    fixture.detectChanges(); //apparently deprecated, as compensating for bad programming
    expect(component.greeting).toBe('Good day');
  });

});
