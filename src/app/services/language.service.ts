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
    this.log("getting: " + url);
    return this.http.get<Translation>(url).pipe(
      tap(_ => this.log(`fetched translation id=${id}`)),
      catchError(this.handleError<Translation>(`getTranslation id=${id}`))
    );
  }
  
  // Allegedly the Angular proxy is designed to only work for
  // CUD operations (PUT, POST, DELETE) when subscribe is implemented.

  /** PUT: update the translation on the server */
  updateTranslation(translation: Translation) {
    this.log("updating translation: " + translation.id);
    this.http.put<any>(this.translationUrl, translation).subscribe({
      next: data => {
      },
      error: error => {
          console.error('Error:', error.message);
      }
    })
  }

  /** POST: add a new translation to the server */
  addTranslation(translation: Translation) {
    this.log("addTranslation: " + this.translationUrl + " " +  translation.id);
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
    this.log("deleting: " + url);
    this.http.delete(url, this.httpOptions)
      .subscribe((s) => {
    });
  }

  get translationUrlValue(): string {
    return this.translationUrl;
  }
}
