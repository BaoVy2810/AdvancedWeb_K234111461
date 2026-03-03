import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Fashion } from '../classes/Fashion';

@Injectable({
  providedIn: 'root',
})
export class FashionAPIService {
  constructor(private _http: HttpClient) {}
  getFashions(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain;charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http.get<any>('http://localhost:3002/fashions', requestOptions).pipe(
      map((res) => JSON.parse(res) as Array<Fashion>),
      retry(3),
      catchError(this.handleError),
    );
  }
  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
  getFashion(_id: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain;charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http.get<any>('http://localhost:3002/fashions/' + _id, requestOptions).pipe(
      map((res) => JSON.parse(res) as Fashion),
      retry(3),
      catchError(this.handleError),
    );
  }
  postFashion(aFashion: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http
      .post<any>('http://localhost:3002/fashions/', JSON.stringify(aFashion), requestOptions)
      .pipe(
        map((res) => JSON.parse(res) as Array<Fashion>),
        retry(3),
        catchError(this.handleError),
      );
  }
  putFashion(aFashion: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http
      .put<any>(
        'http://localhost:3002/fashions/' + aFashion.id,
        JSON.stringify(aFashion),
        requestOptions,
      )
      .pipe(
        map((res) => JSON.parse(res) as Array<Fashion>),
        retry(3),
        catchError(this.handleError),
      );
  }
  deleteFashion(fashionId: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text',
    };
    return this._http
      .delete<any>('http://localhost:3002/fashions/' + fashionId, requestOptions)
      .pipe(
        map((res) => JSON.parse(res) as Array<Fashion>),
        retry(3),
        catchError(this.handleError),
      );
  }
}
