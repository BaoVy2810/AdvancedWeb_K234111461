import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AdminFashionService, Fashion } from '../admin-fashion-service/admin-fashion-service';

@Component({
  selector: 'app-ex58-admin-fashionlist',
  standalone: false,
  templateUrl: './ex58-admin-fashionlist.html',
  styleUrl: './ex58-admin-fashionlist.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})

export class Ex58AdminFashionlist implements OnInit {
  fashions: Fashion[] = [];
  errorMessage = '';
  showDeleteModal = false;
  fashionToDelete: Fashion | null = null;

  constructor(
    private fashionService: AdminFashionService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadFashions();
  }

  loadFashions(): void {
    this.fashionService.getFashions().subscribe({
      next: (data) => {
        this.fashions = data;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.cdr.markForCheck();
      }
    });
  }

  viewDetail(id: string): void {
    this.router.navigate(['/fashion', id]);
  }

  editFashion(id: string): void {
    this.router.navigate(['/fashion/edit', id]);
  }

  addFashion(): void {
    this.router.navigate(['/fashion/new']);
  }

  openDeleteModal(f: Fashion): void {
    this.fashionToDelete = f;
    this.showDeleteModal = true;
    this.cdr.markForCheck();
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.fashionToDelete = null;
    this.cdr.markForCheck();
  }

  confirmDelete(): void {
    if (!this.fashionToDelete?._id) return;
    const id = this.fashionToDelete._id;
    this.fashionService.deleteFashion(id).subscribe({
      next: () => {
        this.closeDeleteModal();
        this.loadFashions();
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.closeDeleteModal();
        this.cdr.markForCheck();
      }
    });
  }

  getThumbnailSrc(base64: string): string {
    return base64 || 'assets/placeholder.jpg';
  }
}