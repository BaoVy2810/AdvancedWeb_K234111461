import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private apiUrl = 'http://localhost:3002';

  constructor(private http: HttpClient, private router: Router) {
    // Kiểm tra token khi service khởi tạo
    const token = localStorage.getItem('authToken');
    if (token) {
      this.loggedIn.next(true);
    }
  }

  // Observable để component có thể subscribe trạng thái login
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  private options = { withCredentials: true };

  // Exercise 61: get saved login (username/password) from cookie for input boxes
  getLoginCookie(): Observable<{ username: string; password: string }> {
    return this.http
      .get<{ username: string; password: string }>(
        `${this.apiUrl}/read-login-cookie`,
        this.options
      )
      .pipe(
        catchError(() => of({ username: '', password: '' }))
      );
  }

  // Đăng ký
  register(username: string, password: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/register`,
      { username, password },
      this.options
    );
  }

  // Đăng nhập
  login(username: string, password: string): Observable<boolean> {
    return this.http
      .post<{ success: boolean }>(
        `${this.apiUrl}/login`,
        { username, password },
        this.options
      )
      .pipe(
      map((response) => {
        if (response.success) {
          localStorage.setItem('authToken', 'loggedin');
          this.loggedIn.next(true);
          this.router.navigate(['/home']);
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  // Đăng xuất (clear login cookie - Exercise 61)
  logout() {
    this.http
      .get(`${this.apiUrl}/clear-login-cookie`, this.options)
      .subscribe(() => {});
    localStorage.removeItem('authToken');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}