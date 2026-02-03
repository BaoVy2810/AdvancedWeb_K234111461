import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookAPIservice } from '../myservices/book-apiservice';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-book-detail',
  standalone: false,
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css',
})
export class BookDetail implements OnInit {
  book: any;
  errMessage: string = '';
  searchId: string = '';
  private searchIdChanges = new Subject<string>();

  constructor(
    private _service: BookAPIservice,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const navState = history.state?.book;
    if (navState?.BookId) {
      this.book = navState;
      this.searchId = navState.BookId;
    }

    this.searchIdChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        if (!value) {
          this.book = null;
          this.errMessage = '';
          return;
        }
        this.searchBook(value);
      });

    this._route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.searchId = id;
        this.searchBook(id);
      } else {
        this.book = null;
        this.errMessage = '';
      }
    });
  }

  onSearchIdChange(value: string) {
    this.searchIdChanges.next(value);
  }

  searchBook(bookId: string) {
    if (!bookId) return;
    this.errMessage = '';
    this._service.getBook(bookId).subscribe({
      next: (data) => {
        this.book = data;
        this.searchId = data.BookId;
      },
      error: (err) => {
        this.errMessage = err?.message || String(err);
        this.book = null;
      }
    });
  }
}
