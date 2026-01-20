import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { retry } from 'rxjs/internal/operators/retry';
import { IFakeProduct } from '../classes/iFakeProduct';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class FakeProductService {
  private _url:string="/exchange"
  constructor(private _http: HttpClient) { }
  getFakeProductData():Observable<any> {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
    headers:headers,
    responseType:"text"
  }
    return this._http.get<any>(this._url,requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<IFakeProduct>),
      retry(3),
      catchError(this.handleError))
  }
    handleError(error:HttpErrorResponse){
      return throwError(()=>new Error(error.message))
    }
}
