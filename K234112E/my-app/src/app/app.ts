import { Component, signal } from '@angular/core';
import { AuthService } from './myservices/auth-service';
import { Ex63Cart } from './exercise63/ex63-cart';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('my-app');
  constructor(
    public authService: AuthService,
    private cartService: Ex63Cart
  ) {}

  logout() {
    this.authService.logout();
  }
  cartCount = 0;
  ngOnInit(): void {
    // Subscribe để cập nhật badge bất cứ khi nào cart thay đổi
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }
}
