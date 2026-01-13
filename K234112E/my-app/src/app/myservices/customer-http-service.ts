import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { ICustomer } from '../classes/icustomer';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root',
})
export class CustomerHttpService {
    private _url="assets/data/customer_service.json";

    constructor(private _http:HttpClient) 
    {

    }
    get_all_customers(): Observable<ICustomer[]> {
    return this._http.get<ICustomer[]>(this._url).pipe(
      catchError((err) => this.handleError(err))
    );}

    private handleError(error: any): Observable<never> {
      console.error('CustomerHttpService error', error);
      return throwError(() => new Error('Error fetching customer data'));
    }
}
