import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookinfoApiServices } from '../bookinfo-api-services';

@Component({
  selector: 'app-ex50-bookinfo-detail-component',
  standalone: false,
  templateUrl: './ex50-bookinfo-detail-component.html',
  styleUrl: './ex50-bookinfo-detail-component.css',
})
export class Ex50BookinfoDetailComponent implements OnInit {
  book: any = null;
  errMessage = '';
  imageLoadError = false;
  private readonly imageBaseUrl = 'http://localhost:3000/static/images/';

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _service: BookinfoApiServices
  ) {}

  ngOnInit(): void {
    this.imageLoadError = false;
    const stateBook = history.state?.book;
    if (stateBook?.BookId) {
      this.book = stateBook;
      return;
    }
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this._service.getBookById(id).subscribe({
        next: (data) => { this.book = data || null; this.errMessage = ''; },
        error: (err) => { this.errMessage = err?.message || String(err); },
      });
    }
  }

  getImageSrc(imageName: string): string {
    return imageName ? `${this.imageBaseUrl}${imageName}` : '';
  }

  goBack(): void {
    this._router.navigate(['/ex50']);
  }
}
