import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CartItem } from '../../classes/iproduct';
import { Ex63Cart } from '../ex63-cart';
import { Router } from '@angular/router';

interface CartRow extends CartItem {
  checked: boolean;
}
@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cartItems: CartRow[] = [];
  loading = true;
  cartError = '';
  successMsg = '';
  showCheckoutModal = false;
  checkoutTotal = '0.00';

  constructor(
    private cartService: Ex63Cart,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }
  loadCart(): void {
    this.loading = true;
    this.cartError = '';
    this.cartService.getCart().subscribe({
      next: (res) => {
        this.cartItems = (res.data || []).map((item) => ({ ...item, checked: false }));
        this.loading = false;
      },
      error: (err) => {
        console.error('Load cart error', err);
        this.cartError = 'Cannot load cart. Is the server running on port 3002?';
        this.cartItems = [];
        this.loading = false;
      },
    });
  }
  get grandTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
  get checkedCount(): number {
    return this.cartItems.filter((i) => i.checked).length;
  }
  get allChecked(): boolean {
    return this.cartItems.length > 0 && this.cartItems.every((i) => i.checked);
  }
  toggleAll(checked: boolean): void {
    this.cartItems.forEach((i) => (i.checked = checked));
  }

  updateCart(): void {
    const toRemove = this.cartItems.filter((i) => i.checked);
    const toUpdate = this.cartItems.filter((i) => !i.checked);

    const removePromises = toRemove.map((item) =>
      firstValueFrom(this.cartService.removeItem(item.productId)),
    );
    const updatePromises = toUpdate.map((item) =>
      firstValueFrom(this.cartService.updateCartItem(item.productId, item.quantity)),
    );

    Promise.all([...removePromises, ...updatePromises])
      .then(() => {
        const msg =
          toRemove.length > 0
            ? `🗑 Removed ${toRemove.length} item(s). Cart updated!`
            : '✅ Cart quantities updated!';
        this.showSuccess(msg);
        this.loadCart();
      })
      .catch((err) => console.error('Update cart error', err));
  }
  continueShopping(): void {
    this.router.navigate(['/ex63']);
  }
  checkout(): void {
    const total = this.grandTotal.toFixed(2);
    this.checkoutTotal = total;
    this.cartService.checkout().subscribe({
      next: () => {
        this.cartItems = [];
        this.showCheckoutModal = true;
      },
      error: (err) => console.error('Checkout error', err),
    });
  }

  closeModal(): void {
    this.showCheckoutModal = false;
    this.router.navigate(['/ex63']);
  }

  private showSuccess(msg: string): void {
    this.successMsg = msg;
    setTimeout(() => (this.successMsg = ''), 3000);
  }

  imageBaseUrl = 'http://localhost:3002/';
  getImageUrl(img: string | undefined): string {
    if (!img) return '';
    const encoded = encodeURI(img);
    if (img.startsWith('http')) return img;
    if (img.startsWith('assets/')) return '/' + encoded;
    return this.imageBaseUrl + encoded;
  }
  onImageError(e: Event): void {
    const el = e.target as HTMLImageElement;
    if (el) el.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect fill='%23eee' width='80' height='80'/%3E%3C/svg%3E";
  }
}
