import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookAPIservice } from '../myservices/book-apiservice';

@Component({
  selector: 'app-book-detail',
  standalone: false,
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css',
})
export class BookDetail{
  book:any;
  errMessage:string=''
  constructor(
    private _service: BookAPIservice,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    activeRouter.paramMap.subscribe((params)=>{
      let bookId=params.get("id")
      if (bookId!=null)
        this.searchBook(bookId)
    })
  }
  searchBook(bookId:string)
  {
    this._service.getBook(bookId).subscribe({
      next:(data)=>{
        this.book=data;
        this.cdr.detectChanges();
      },
      error:(err)=>{
        this.errMessage=err.message;
        this.cdr.detectChanges();
      }
    })
  }
}
