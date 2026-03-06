import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Ex58Fashion } from './ex58-fashion.model';
import { Ex58FashionService } from './ex58-fashion.service';

@Component({
  selector: 'app-exercise58',
  standalone: false,
  templateUrl: './exercise58.html',
  styleUrl: './exercise58.css',
})
export class Exercise58 {
  list: Ex58Fashion[] = [];
  loading = true;
  error = '';

  constructor(
    private service: Ex58FashionService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadList();
  }

  loadList(): void {
    this.loading = true;
    this.error = '';
    this.service.getAll().subscribe({
      next: (data) => {
        this.list = data || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.message || 'Cannot load fashion list.';
        this.loading = false;
      },
    });
  }

  viewDetail(id: string): void {
    this.router.navigate(['/ex58', 'detail', id]);
  }

  edit(id: string): void {
    this.router.navigate(['/ex58', 'edit', id]);
  }

  addNew(): void {
    this.router.navigate(['/ex58', 'new']);
  }

  deleteItem(item: Ex58Fashion): void {
    if (!item._id) return;
    if (!confirm(`Delete "${item.title}"?`)) return;
    this.service.delete(item._id).subscribe({
      next: () => this.loadList(),
      error: (err) => {
        this.error = err?.message || 'Delete failed.';
      },
    });
  }

  getThumbnailUrl(thumb: string): string {
    if (!thumb) return '';
    if (thumb.startsWith('http') || thumb.startsWith('/')) return thumb;
    return thumb;
  }
}
