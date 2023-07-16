//import { TestBed } from '@angular/core/testing'; //testbed approach

import { HttpErrorResponse } from '@angular/common/http'; //constructor approach
import { FakeService } from './fake.service';

import { Injectable } from '@angular/core'; // constructor approach
import { Observable, of, throwError } from 'rxjs'; // constructor approach

describe('FakeService', () => {
  let service: FakeService;
  let httpClientSpy: any;// CA

  beforeEach(() => {
    //TestBed.configureTestingModule({}); // testbed approach?
    //service = TestBed.inject(FakeService); //testbed approach?
    httpClientSpy = {
      get: jest.fn(),
      post: jest.fn()
    };// creates mock for CA
    service = new FakeService(httpClientSpy);//CA
  });

  //CA
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getDataV1',() =>{
    const res = "Banana";
    const url = "https://jsonplaceholder.typicode.com/todos/1";
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res));
    service.getDataV1();
    expect(httpClientSpy.get).toBeCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  });

  it('should test getDataV2',(done) => {
    const res = "Banana";
    const url = "https://jsonplaceholder.typicode.com/todos/1";
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res));

    //async
    service.getDataV2().subscribe(
      {
        next : data => {
          expect(data).toEqual(/*"Orange"*/res);
          done();
        },
        error : error => console.log(error)
    });
    expect(httpClientSpy.get).toBeCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  });

  it('getDataV2 should throw error',(done) => {
    const errorResponse = new HttpErrorResponse({ // HttpErrorResponse requires import
      error : 'test 404 error',
      status: 404,
      statusText: 'Not found'
    })
    const url = "https://jsonplaceholder.typicode.com/todos/1";
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(throwError(() => errorResponse));

    //async
    service.getDataV2().subscribe(
      {
        next : data => console.log(data),
        error : error => {
          expect(error.message).toContain('test 404 error');
          done();
        }
    });
    expect(httpClientSpy.get).toBeCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  });

  it('should test postDataV1', () => {
    const command = 'testing';
    const res = "Banana";
    const url = "https://jsonplaceholder.typicode.com/todos/1";
    jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(res));
    service.postDataV1(command);
    expect(httpClientSpy.post).toBeCalledTimes(1);
  })

});
