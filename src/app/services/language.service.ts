import { Injectable } from '@angular/core';
import { Translation } from '../translation';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private translationUrl = 'api/translations';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
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
    console.log("getting translations");
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
    return this.http.get<Translation>(url).pipe(
      tap(_ => this.log(`fetched translation id=${id}`)),
      catchError(this.handleError<Translation>(`getTranslation id=${id}`))
    );
  }

  
  /** PUT: update the translation on the server */
  /*updateTranslation(translaton: Translation): Observable<any> {
    return this.http.put(this.translationUrl, translation, this.httpOptions).pipe(
      tap(_ => this.log(`updated translation id=${translation.id}`)),
      catchError(this.handleError<any>('updateTranslation'))
    );
  }*/

  /** POST: add a new translation to the server */
  /*addTranslation(translation: Translation): Observable<Translation> {
    return this.http.post<Translation>(this.translationUrl, translation, this.httpOptions).pipe(
      tap((newTranslation: Translation) => this.log(`added translation w/ id=${newTranslation.id}`)),
      catchError(this.handleError<Translation>('addTranslation'))
    );
  }*/

  /** DELETE: delete the translation from the server */
  deleteTranslation(id: number): Observable<Translation> {
    const url = `${this.translationUrl}/${id}`;

    return this.http.delete<Translation>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted translation id=${id}`)),
      catchError(this.handleError<Translation>('deleteTranslation'))
    );
  }

  /* GET translations whose text contains search term */
  searchTranslations(term: string): Observable<Translation[]> {
    if (!term.trim()) {
      // if not search term, return empty translation array.
      return of([]);
    }
    return this.http.get<Translation[]>(`${this.translationUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found translations matching "${term}"`) :
        this.log(`no translations matching "${term}"`)),
      catchError(this.handleError<Translation[]>('searchTranslations', []))
    );
  }
}
