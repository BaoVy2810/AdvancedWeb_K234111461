import { ChangeDetectorRef,Component } from '@angular/core';
import { FashionAPIService } from '../myservices/fashion-apiservice';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fashion',
  standalone: false,
  templateUrl: './fashion.html',
  styleUrl: './fashion.css',
})
export class Fashion {
  fashions: any;
  errMessage: string = '';
  constructor(private _service: FashionAPIService, private router: Router,private ActivateRouter: ActivatedRoute,private cdr: ChangeDetectorRef){
    this._service.getFashions().subscribe({
      next: (data) => {
        this.fashions = data;
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
    let prefix = 'data:image/jpeg;base64,';
    if (base64.startsWith(prefix)) return base64;
    return prefix + base64;
  }
  show_detail(id: any) {
    this.router.navigate(['ex54', id]);
  }
}
