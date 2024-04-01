import { Injectable } from '@angular/core';
import { Translation } from '../translation';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private translationUrl = 'api/cards';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    /*headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Access-Control-Request-Headers': 'PUT',
    })*/
  };

  // This is an example of a typical service-in-service scenario
  constructor(private http: HttpClient) { }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** GET translations from the server */
  getTranslations(): Observable<Translation[]> {
    return this.http.get<Translation[]>(this.translationUrl)
      .pipe(
        tap(_ => this.log('fetched translations')),
        catchError(this.handleError<Translation[]>('getTranslations', []))
      );
  }

  private log(message: string) {
    console.log(`LanguageService: ${message}`);
  }

  /** GET translation by id. Will 404 if id not found */
  getTranslation(id: number): Observable<Translation> {
    const url = `${this.translationUrl}/${id}`;
    console.log("getting...",url);
    return this.http.get<Translation>(url).pipe(
      tap(_ => this.log(`fetched translation id=${id}`)),
      catchError(this.handleError<Translation>(`getTranslation id=${id}`))
    );
  }
  
  /** PUT: update the translation on the server */
  // Apparently the Angular proxy is designed to only work for
    // CUD operations when subscribe is implemented.

  /*updateTranslation(translation: Translation): Observable<any> {
    return this.http.put(this.translationUrl, translation, this.httpOptions).pipe(
      tap(_ => this.log(`updated translation id=${translation.id}`)),
      catchError(this.handleError<any>('updateTranslation'))
    );*/
  updateTranslation(translation: Translation) {
    console.log("updating translation:", translation);
    this.http.put<any>(this.translationUrl, translation, this.httpOptions).subscribe({
      next: data => {
      },
      error: error => {
          console.error('Error:', error.message);
      }
    })
  }
  // TODO: Get this working with the PUT implementation on the C# backend.
  // Currently a 405 errror.

  /** POST: add a new translation to the server */
  //addTranslation(translation: Translation): Observable<Translation> {
  addTranslation(translation: Translation) {
    console.log("addTranslation:",this.translationUrl, translation);
    /*return this.http.post<Translation>(this.translationUrl, translation, this.httpOptions).pipe(
      tap((newTranslation: Translation) => this.log(`added translation w/ id=${newTranslation.id}`)),
      catchError(this.handleError<Translation>('addTranslation'))
    );*/

    // Apparently the Angular proxy is designed to only work for
    // CUD operations when subscribe is implemented.
    this.http.post<any>(this.translationUrl, translation).subscribe({
      next: data => {
          //this.postId = data.id;
      },
      error: error => {
          console.error('Error:', error.message);
      }
    })
    
  }

  /** DELETE: delete the translation from the server */
  deleteTranslation(id: number) {
    const url = `${this.translationUrl}/${id}`;
    console.log("deleting",url);
    /*return this.http.delete<Translation>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted translation id=${id}`)),
      catchError(this.handleError<Translation>('deleteTranslation'))
    );*/
    
    // Apparently the Angular proxy is designed to only work for
    // CUD operations when subscribe is implemented.
    this.http.delete(url, this.httpOptions)
      .subscribe((s) => {
      console.log(s);
    });
  }

  get translationUrlValue(): string {
    return this.translationUrl;
  }
}
