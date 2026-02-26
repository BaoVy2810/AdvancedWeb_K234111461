import { ChangeDetectorRef, Component } from '@angular/core';
import { BookAPIservice } from '../myservices/book-apiservice';

@Component({
  selector: 'app-book-delete-component',
  standalone: false,
  templateUrl: './book-delete-component.html',
  styleUrl: './book-delete-component.css',
})
export class BookDeleteComponent {
  books: any;
  errMessage: string = '';
  constructor(private _service: BookAPIservice, private cdr: ChangeDetectorRef) {
    this._service.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errMessage = err.message;
        this.cdr.detectChanges();
      },
    });
  }
  deleteBook(bookId: any) {
    this._service.deleteBook(bookId).subscribe({
      next: (data) => {
        this.books = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errMessage = err.message;
        this.cdr.detectChanges();
      },
    });
  }
}
