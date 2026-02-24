import { Component } from '@angular/core';
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
    private router:Router,
    private _route: ActivatedRoute
  ) {
    this._service.getBooks().subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (err) => {
        this.errMessage = err;
      }
    })
    activeRouter.paramMap.subscribe((params)=>{
      let bookId=params.get("id")
      if (bookId!=null)
        this.searchBook(bookId)
    })
  }
  putBook() {
    this._service.putBook(this.book).subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }
  searchBook(bookId:String)
  {
    this._service.getBooks(bookId).subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (err) => {
        this.errMessage = err;
    },
  })
}
