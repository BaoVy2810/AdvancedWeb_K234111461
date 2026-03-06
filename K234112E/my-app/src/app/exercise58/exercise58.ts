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
  itemToDelete: Ex58Fashion | null = null;
  errorModalMessage: string | null = null;

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
    this.errorModalMessage = null;
    this.service.getAll().subscribe({
      next: (data) => {
        this.list = data || [];
        this.loading = false;
      },
      error: (err) => {
        this.errorModalMessage = err?.message || 'Cannot load fashion list.';
        this.loading = false;
      },
    });
  }

  dismissErrorModal(): void {
    this.errorModalMessage = null;
    this.error = '';
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
    this.itemToDelete = item;
  }

  cancelDelete(): void {
    this.itemToDelete = null;
  }

  confirmDelete(): void {
    if (!this.itemToDelete?._id) return;
    const id = this.itemToDelete._id;
    this.itemToDelete = null;
    this.service.delete(id).subscribe({
      next: () => this.loadList(),
      error: (err) => {
        this.errorModalMessage = err?.message || 'Delete failed.';
      },
    });
  }

  getThumbnailUrl(thumb: string): string {
    if (!thumb) return '';
    if (thumb.startsWith('http') || thumb.startsWith('/')) return thumb;
    return thumb;
  }
}
