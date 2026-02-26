import { ChangeDetectorRef, Component } from '@angular/core';
import { Book } from '../classes/ibook';
import { BookAPIservice } from '../myservices/book-apiservice';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-update-component',
  standalone: false,
  templateUrl: './book-update-component.html',
  styleUrl: './book-update-component.css',
})
export class BookUpdateComponent {
  book = new Book();
  books: any;
  errMessage: string = '';
  constructor(
    private _service: BookAPIservice,
    private router: Router,
    private _route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this._service.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errMessage = err.message;
        this.cdr.detectChanges();
      }
    })
    this._route.paramMap.subscribe((params)=>{
      let bookId=params.get("id")
      if (bookId!=null)
        this.searchBook(bookId)
    })
  }
  putBook() {
    this._service.putBook(this.book).subscribe({
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
  searchBook(bookId:string)
  {
    this._service.getBook(bookId).subscribe({
      next: (data) => {
        this.book = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errMessage = err.message;
        this.cdr.detectChanges();
      },
    })
  }
}
