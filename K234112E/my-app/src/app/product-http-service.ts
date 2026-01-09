import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from './classes/iproduct';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ProductHttpService {
  product_url="./assets/dataset/product.json";

  constructor(private _http:HttpClient) 
  {

  }
  get_all_products():Observable<IProduct[]> 
  {
    return this._http.get<IProduct[]>(this.product_url);}
}
