import { ChangeDetectorRef, Component } from '@angular/core';
import { BookAPIservice } from '../myservices/book-apiservice';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books {
  books:any;
  errMessage:string=''
  constructor(private _service: BookAPIservice, private router: Router,private ActivateRouter: ActivatedRoute,private cdr: ChangeDetectorRef){
    this._service.getBooks().subscribe({
      next:(data)=>{
        this.books=data;
        this.cdr.detectChanges();
      },
      error:(err)=>{
        this.errMessage=err.message;
        this.cdr.detectChanges();
      }
    })
  }
    show_detail(id:any)
    {
      this.router.navigate(["ex41",id])
    }
    show_update(id:any)
    {
      this.router.navigate(["ex45",id])
    }
    request_delete(id:any)
    {
      if(confirm("Are you sure want to delete BookId=["+id+"]?"))
      {
        this.deleteBook(id)
      }
    }
    deleteBook(bookId:any)
    {
      this._service.deleteBook(bookId).subscribe({
        next:(data)=>{
          this.books=data;
          this.cdr.detectChanges();
        },
        error:(err)=>{
          this.errMessage=err.message;
          this.cdr.detectChanges();
        }
      })
    }
  }