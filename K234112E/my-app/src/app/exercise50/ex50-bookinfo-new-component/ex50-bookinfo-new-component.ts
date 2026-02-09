import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookInformation } from '../../classes/ibook';
import { BookinfoApiServices } from '../bookinfo-api-services';

@Component({
  selector: 'app-ex50-bookinfo-new-component',
  standalone: false,
  templateUrl: './ex50-bookinfo-new-component.html',
  styleUrl: './ex50-bookinfo-new-component.css',
})
export class Ex50BookinfoNewComponent implements OnInit {
  book = new BookInformation();
  bookinfo: any[] = [];
  selectedBook: any = null;
  errMessage = '';
  isEditMode = false;

  private readonly imageBaseUrl = 'http://localhost:3000/static/images/';

  constructor(
    private _service: BookinfoApiServices,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.loadBooks();
  }

  ngOnInit(): void {
    const stateBook = history.state?.book;
    if (stateBook?.BookId) {
      this.book = { ...stateBook };
      this.isEditMode = true;
      return;
    }
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this._service.getBookById(id).subscribe({
        next: (data) => {
          if (data && data.BookId) {
            this.book = { ...data };
            this.isEditMode = true;
          }
        },
        error: (err) => { this.errMessage = err?.message || String(err); },
      });
    }
  }

  loadBooks(): void {
    this._service.getBookInfo().subscribe({
      next: (data) => { this.bookinfo = data || []; this.errMessage = ''; },
      error: (err) => { this.errMessage = err?.message || String(err); },
    });
  }

  getImageSrc(imageName: string): string {
    return imageName ? `${this.imageBaseUrl}${imageName}` : '';
  }

  submitBook(): void {
    if (this.isEditMode) {
      this.putBook();
    } else {
      this.postBook();
    }
  }

  postBook(): void {
    this._service.postBook(this.book).subscribe({
      next: () => {
        this.loadBooks();
        this.errMessage = '';
        this.book = new BookInformation();
      },
      error: (err) => { this.errMessage = err?.message || String(err); },
    });
  }

  putBook(): void {
    this._service.putBook(this.book).subscribe({
      next: () => {
        this.loadBooks();
        this.errMessage = '';
        this.isEditMode = false;
        this.book = new BookInformation();
      },
      error: (err) => { this.errMessage = err?.message || String(err); },
    });
  }

  editBook(b: any): void {
    if (!b?.BookId) return;
    this.book = { ...b };
    this.isEditMode = true;
  }

  viewDetail(b: any): void {
    if (!b?.BookId) return;
    this._router.navigate(['/ex50/detail', b.BookId], { state: { book: b } });
  }

  closeDetail(): void {
    this.selectedBook = null;
  }

  deleteBook(bookId: string): void {
    if (!bookId) return;
    if (!confirm('Bạn có chắc muốn xóa sách này?')) return;
    this._service.deleteBook(bookId).subscribe({
      next: (data) => { this.bookinfo = data || []; this.errMessage = ''; },
      error: (err) => { this.errMessage = err?.message || String(err); },
    });
  }

  resetForm(): void {
    this.book = new BookInformation();
    this.isEditMode = false;
    this.errMessage = '';
  }
}
