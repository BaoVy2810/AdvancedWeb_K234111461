import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Ex58Fashion } from '../ex58-fashion.model';
import { Ex58FashionService } from '../ex58-fashion.service';

@Component({
  selector: 'app-ex58-client',
  standalone: false,
  templateUrl: './ex58-client.html',
  styleUrl: './ex58-client.css',
})
export class Ex58Client {
  all: Ex58Fashion[] = [];
  styles: string[] = [];
  filterStyle = '';
  loading = true;
  error = '';

  constructor(
    private service: Ex58FashionService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';
    this.service.getAll().subscribe({
      next: (data) => {
        this.all = data || [];
        const set = new Set<string>();
        this.all.forEach((f) => (f.style ? set.add(f.style.trim()) : null));
        this.styles = Array.from(set).sort();
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.message || 'Cannot load fashions.';
        this.loading = false;
      },
    });
  }

  search(): void {
    this.loading = true;
    this.error = '';
    const style = this.filterStyle?.trim();
    if (!style) {
      this.service.getAll().subscribe({
        next: (data) => {
          this.all = data || [];
          this.loading = false;
        },
        error: (err) => {
          this.error = err?.message || 'Cannot load fashions.';
          this.loading = false;
        },
      });
      return;
    }
    this.service.getAll(style).subscribe({
      next: (data) => {
        this.all = data || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.message || 'Cannot load fashions.';
        this.loading = false;
      },
    });
  }

  getItemsByStyle(style: string): Ex58Fashion[] {
    return this.all.filter((f) => (f.style || '').trim() === style);
  }

  get groupedByStyle(): { style: string; items: Ex58Fashion[] }[] {
    const styleSet = new Set<string>();
    this.all.forEach((f) => (f.style ? styleSet.add(f.style.trim()) : null));
    return Array.from(styleSet)
      .sort()
      .map((style) => ({ style, items: this.getItemsByStyle(style) }));
  }

  goToDetail(id: string): void {
    this.router.navigate(['/ex58-client', 'detail', id]);
  }

  getThumbnailUrl(thumb: string): string {
    if (!thumb) return '';
    return thumb.startsWith('http') || thumb.startsWith('/') ? thumb : thumb;
  }
}
