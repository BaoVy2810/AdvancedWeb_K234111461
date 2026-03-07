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

  deleteFashion(id: string): void {
    if (confirm('Bạn có chắc muốn xóa fashion này?')) {
      this.fashionService.deleteFashion(id).subscribe({
        next: () => this.loadFashions(),
        error: (err) => {
          this.errorMessage = err.message;
          this.cdr.markForCheck();
        }
      });
    }
  }

  getThumbnailSrc(base64: string): string {
    return base64 || 'assets/placeholder.jpg';
  }
}