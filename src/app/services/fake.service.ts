import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeService {

  constructor(private http: HttpClient) { }

  getDataV1(): Observable<any> {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    return this.http.get(url);
  }

  getDataV2(): Observable<any> {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    return this.http.get(url).pipe(
      tap((data : any) => console.log('Data fetched',data)),
      catchError(this.handleError("Failed to fetch data"))
    );
  }

  postDataV1(data : any): Observable<any> {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const httpOptions = {
      headers : new HttpHeaders({'contentType':'application/json'})
    }
    return this.http.post(data, url, httpOptions);
  }

  private handleError<T> (operation = 'operation'){
    return (error : HttpErrorResponse):Observable<T> => {
      console.error(error);
      const message = `server returned code' ${error.status} with body '${error.error}`;
      throw new Error(`${operation} failed: ${message}`); 

    };
  }
}
