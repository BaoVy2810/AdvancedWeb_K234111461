import { Component } from '@angular/core';
import { BookAPIservice } from '../myservices/book-apiservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books {
  books:any;
  errMessage:string=''
  constructor(
    private _service: BookAPIservice,
    private router: Router
  ){
    this._service.getBooks().subscribe({
      next:(data)=>{this.books=data},
      error:(err)=>{this.errMessage=err}
    })
  }
  goToBookDetail(book: any): void {
    if (!book?.BookId) return;
    this.router.navigate(['/ex41', book.BookId], {
      state: { book }
    });
  }
  putBook(book: any) {
    if (!book?.BookId) return;
    this.router.navigate(['/ex43', book.BookId], { state: { book } });
  }
  deleteBook(bookId: any) {
    if (!bookId) return;
    if (!confirm('Bạn có chắc muốn xóa sách này?')) return;
    this._service.deleteBook(bookId).subscribe({
      next: (data) => { this.books = data; this.errMessage = ''; },
      error: (err) => { this.errMessage = err?.message || String(err); }
    });
  }
}