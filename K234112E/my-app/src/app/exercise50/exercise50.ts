import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookinfoApiServices } from './bookinfo-api-services';

@Component({
  selector: 'app-exercise50',
  standalone: false,
  templateUrl: './exercise50.html',
  styleUrl: './exercise50.css',
})
export class Exercise50 {
  bookinfo: any[] = [];
  errMessage = '';

  constructor(
    private _service: BookinfoApiServices,
    private _router: Router
  ) {
    this.loadBooks();
  }

  loadBooks(): void {
    this._service.getBookInfo().subscribe({
      next: (data) => { this.bookinfo = data || []; this.errMessage = ''; },
      error: (err) => { this.errMessage = err?.message || String(err); },
    });
  }

  editBook(b: any): void {
    if (!b?.BookId) return;
    this._router.navigate(['/ex50/bookinfo', b.BookId], { state: { book: b } });
  }

  viewDetail(b: any): void {
    if (!b?.BookId) return;
    this._router.navigate(['/ex50/detail', b.BookId], { state: { book: b } });
  }

  deleteBook(bookId: string): void {
    if (!bookId) return;
    if (!confirm('Bạn có chắc muốn xóa sách này?')) return;
    this._service.deleteBook(bookId).subscribe({
      next: (data) => { this.bookinfo = data || []; this.errMessage = ''; },
      error: (err) => { this.errMessage = err?.message || String(err); },
    });
  }
}
