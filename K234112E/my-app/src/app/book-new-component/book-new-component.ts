import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../classes/ibook';
import { BookAPIservice } from '../myservices/book-apiservice';

@Component({
  selector: 'app-book-new-component',
  standalone: false,
  templateUrl: './book-new-component.html',
  styleUrl: './book-new-component.css',
})
export class BookNewComponent implements OnInit {
  book = new Book();
  books: any;
  errMessage: string = '';
  isEditMode = false;

  constructor(
    private _service: BookAPIservice,
    private _router: Router
  ) {
    this._service.getBooks().subscribe({
      next: (data) => { this.books = data; },
      error: (err) => { this.errMessage = err?.message || String(err); },
    });
  }

  ngOnInit(): void {
    const stateBook = history.state?.book;
    if (stateBook?.BookId) {
      this.book = { ...stateBook };
      this.isEditMode = true;
    }
  }

  submitBook(): void {
    if (this.isEditMode) {
      this.putBook();
    } else {
      this.postBook();
    }
  }

  postBook(): void {
    alert("Tên sách: " + this.book.BookName);
    this._service.postBook(this.book).subscribe({
      next: (data) => {
        this.books = data;
        this.errMessage = '';
        this._router.navigate(['/ex39']);
      },
      error: (err) => { this.errMessage = err?.message || String(err); },
    });
  }

  putBook(): void {
    this._service.putBook(this.book).subscribe({
      next: (data) => {
        this.books = data;
        this.errMessage = '';
        this._router.navigate(['/ex39']);
      },
      error: (err) => { this.errMessage = err?.message || String(err); },
    });
  }

  editBook(book: any): void {
    if (!book?.BookId) return;
    this.book = { ...book };
    this.isEditMode = true;
  }

  goToBookDetail(book: any): void {
    if (!book?.BookId) return;
    this._router.navigate(['/ex41', book.BookId], { state: { book } });
  }

  deleteBook(bookId: string): void {
    if (!bookId) return;
    if (!confirm('Bạn có chắc muốn xóa sách này?')) return;
    this._service.deleteBook(bookId).subscribe({
      next: (data) => { this.books = data; this.errMessage = ''; },
      error: (err) => { this.errMessage = err?.message || String(err); },
    });
  }
}
