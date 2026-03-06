import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../classes/iproduct';
import { Ex63Cart } from './ex63-cart';
import { Ex63Product } from './ex63-product';

@Component({
  selector: 'app-exercise63',
  standalone: false,
  templateUrl: './exercise63.html',
  styleUrl: './exercise63.css',
})
export class Exercise63 {
  products: Product[] = [];
  loading = true;
  errorMsg = '';
  addingId: string | null = null;
  addedIds: Set<string> = new Set();

  constructor(
    private productService: Ex63Product,
    public cartService: Ex63Cart,
    private router: Router,
  ) {}

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (list) => {
        this.products = list || [];
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = 'Cannot load products from products-seed.json.';
        this.loading = false;
        console.error(err);
      },
    });
  }

  addToCart(product: Product): void {
    this.addingId = product._id;
    this.cartService.addToCartItem(product).subscribe({
      next: () => {
        this.addedIds.add(product._id);
        this.addingId = null;
        setTimeout(() => this.addedIds.delete(product._id), 1500);
      },
      error: (err) => {
        console.error('Add to cart error', err);
        this.addingId = null;
      },
    });
  }

  isAdding(id: string): boolean {
    return this.addingId === id;
  }

  isAdded(id: string): boolean {
    return this.addedIds.has(id);
  }

  imageBaseUrl = "http://localhost:3002/";
  getImageUrl(img: string | undefined): string {
    if (!img) return "";
    const encoded = encodeURI(img);
    if (img.startsWith("http")) return img;
    if (img.startsWith("assets/")) return "/" + encoded;
    return this.imageBaseUrl + encoded;
  }
  onImageError(e: Event): void {
    const el = e.target as HTMLImageElement;
    if (el) el.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23eee' width='200' height='200'/%3E%3Ctext fill='%23999' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'%3ENo image%3C/text%3E%3C/svg%3E";
  }
}
