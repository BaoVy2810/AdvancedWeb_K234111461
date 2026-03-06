import { HttpClient } from "@angular/common/http";
import { CartItem, Product } from "../classes/iproduct";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class Ex63Cart {
  private apiUrl = 'http://localhost:3002/api';
  
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(private http: HttpClient) {
    this.refreshCount();
  }

  private calcAndEmit(items: CartItem[]) {
    const total = items.reduce((s, i) => s + i.quantity, 0);
    this.cartCountSubject.next(total);
  }

  refreshCount() {
    this.getCart().subscribe({
      next: res => this.calcAndEmit(res.data || []),
      error: () => this.cartCountSubject.next(0),
    });
  }

  getCart(): Observable<{ success: boolean; data: CartItem[] }> {
    return this.http.get<{ success: boolean; data: CartItem[] }>(
      `${this.apiUrl}/cart`,
      { withCredentials: true }
    );
  }

  addToCartItem(product: Product): Observable<{ success: boolean; data: CartItem[] }> {
    return this.http.post<{ success: boolean; data: CartItem[] }>(
      `${this.apiUrl}/cart/add`,
      {
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image || '',
      },
      { withCredentials: true }
    ).pipe(
      tap(res => this.calcAndEmit(res.data || []))
    );
  }

  addToCart(productId: string): Observable<{ success: boolean; data: CartItem[] }> {
    return this.http.post<{ success: boolean; data: CartItem[] }>(
      `${this.apiUrl}/cart/add`,
      { productId },
      { withCredentials: true }
    ).pipe(
      tap(res => this.calcAndEmit(res.data || []))
    );
  }

  updateCartItem(productId: string, quantity: number): Observable<{ success: boolean; data: CartItem[] }> {
    return this.http.put<{ success: boolean; data: CartItem[] }>(
      `${this.apiUrl}/cart/update`,
      { productId, quantity },
      { withCredentials: true }
    ).pipe(
      tap(res => this.calcAndEmit(res.data || []))
    );
  }

  removeItem(productId: string): Observable<{ success: boolean; data: CartItem[] }> {
    return this.http.delete<{ success: boolean; data: CartItem[] }>(
      `${this.apiUrl}/cart/remove/${productId}`,
      { withCredentials: true }
    ).pipe(
      tap(res => this.calcAndEmit(res.data || []))
    );
  }

  clearCart(): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/cart/clear`,
      { withCredentials: true }
    ).pipe(
      tap(() => this.cartCountSubject.next(0))
    );
  }

  checkout(): Observable<{ success: boolean; message: string; total: string }> {
    return this.http.post<{ success: boolean; message: string; total: string }>(
      `${this.apiUrl}/cart/checkout`,
      {},
      { withCredentials: true }
    ).pipe(
      tap(() => this.cartCountSubject.next(0))
    );
  }
}
