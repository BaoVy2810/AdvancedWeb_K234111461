import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../classes/iproduct';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Ex63Product {
  private apiUrl = 'http://localhost:3002/api';

  constructor(private http: HttpClient) {}

  /** Danh sách sản phẩm hiển thị: lấy từ file products-seed.json (không từ MongoDB) */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/ex63/products-seed.json');
  }

  getProduct(id: string): Observable<Product | undefined> {
    return this.http.get<Product[]>('assets/ex63/products-seed.json').pipe(
      map((list) => list.find((p) => p._id === id))
    );
  }
}
