import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../classes/ibook';
import { BookAPIservice } from '../myservices/book-apiservice';

@Component({
  selector: 'app-book-new-component',
  standalone: false,
  templateUrl: './book-new-component.html',
  styleUrl: './book-new-component.css',
})
export class BookNewComponent{
  book = new Book();
  books: any;
  errMessage: string = '';
  constructor(private _service: BookAPIservice, private router: Router, private cdr: ChangeDetectorRef) {
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
  postBook() {
    this._service.postBook(this.book).subscribe({
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
  back() {
    this.router.navigate(['/ex39']);
  }
}
