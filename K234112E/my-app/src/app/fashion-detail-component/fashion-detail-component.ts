import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FashionAPIService } from '../myservices/fashion-apiservice';

@Component({
  selector: 'app-fashion-detail-component',
  standalone: false,
  templateUrl: './fashion-detail-component.html',
  styleUrl: './fashion-detail-component.css',
})
export class FashionDetailComponent {
  fashion: any;
  errMessage: string = '';
  constructor(
    private _service: FashionAPIService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {
    activeRouter.paramMap.subscribe((params) => {
      let fashionId = params.get('id');
      if (fashionId != null) this.searchFashion(fashionId);
    });
  }
  searchFashion(fashionId: string) {
    this._service.getFashion(fashionId).subscribe({
      next: (data) => {
        this.fashion = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errMessage = err.message;
        this.cdr.detectChanges();
      },
    });
  }
  get_image(base64: string) {
    if (base64 == null) return '';
    const prefix = 'data:image/jpeg;base64,';
    if (base64.startsWith(prefix)) return base64;
    return prefix + base64;
  }
}
