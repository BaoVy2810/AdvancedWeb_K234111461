import { Component } from '@angular/core';
import { Book } from '../classes/ibook';
import { BookAPIservice } from '../myservices/book-apiservice';

@Component({
  selector: 'app-book-new-component',
  standalone: false,
  templateUrl: './book-new-component.html',
  styleUrl: './book-new-component.css',
})
export class BookNewComponent {
  book = new Book();
  books: any;
  errMessage: string = '';
  constructor(private _service: BookAPIservice) {
    this._service.getBooks().subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }
  postBook() {
    alert("Tên sách: " + this.book.BookName);
    this._service.postBook(this.book).subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }
}
