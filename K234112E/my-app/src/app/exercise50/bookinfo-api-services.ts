import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { IBookInformation } from '../classes/ibook';

@Injectable({
  providedIn: 'root',
})
export class BookinfoApiServices {
  constructor(private _http: HttpClient) { }
  getBookInfo():Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("http://localhost:3000/bookinfo/",requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<IBookInformation>),
      retry(3),
      catchError(this.handleError))
  }
  getBookById(id: string): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8");
    const requestOptions: Object = { headers, responseType: "text" };
    return this._http.get<any>("http://localhost:3000/bookinfo/" + id, requestOptions).pipe(
      map(res => JSON.parse(res)),
      retry(3),
      catchError(this.handleError)
    );
  }
  handleError(error:HttpErrorResponse){
    return throwError(()=>new Error(error.message))
  }
  postBook(aBookInfo:any):Observable<any>
    {
      const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
      const requestOptions:Object={
        headers:headers,
        responseType:"text"
      }
      return this._http.post<any>("http://localhost:3000/bookinfo/",JSON.stringify(aBookInfo),requestOptions).pipe(
        map(res=>JSON.parse(res) as Array<IBookInformation>),
        retry(3),
        catchError(this.handleError))
    }
  putBook(aBookInfo:any):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.put<any>("http://localhost:3000/bookinfo/",JSON.stringify(aBookInfo),requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<IBookInformation>),
      retry(3),
      catchError(this.handleError))
  }
  deleteBook(bookId:string):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.delete<any>("http://localhost:3000/bookinfo/"+bookId,requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<IBookInformation>),
      retry(3),
      catchError(this.handleError))
  }
}
