import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Ex58Fashion } from '../ex58-fashion.model';
import { Ex58FashionService } from '../ex58-fashion.service';

@Component({
  selector: 'app-ex58-detail',
  standalone: false,
  templateUrl: './ex58-detail.html',
  styleUrl: './ex58-detail.css',
})
export class Ex58Detail {
  item: Ex58Fashion | null = null;
  loading = true;
  error = '';
  errorModalMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: Ex58FashionService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.load(id);
  }

  load(id: string): void {
    this.service.getById(id).subscribe({
      next: (data) => {
        this.item = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorModalMessage = err?.message || 'Cannot load fashion.';
        this.loading = false;
      },
    });
  }

  getDetailsHtml(): SafeHtml | null {
    if (!this.item?.details) return null;
    return this.sanitizer.bypassSecurityTrustHtml(this.item.details);
  }

  back(): void {
    const fromClient = this.router.url.includes('ex58-client');
    this.router.navigate([fromClient ? '/ex58-client' : '/ex58']);
  }

  dismissErrorModal(): void {
    this.errorModalMessage = null;
    this.error = '';
  }

  edit(): void {
    if (this.item?._id) this.router.navigate(['/ex58', 'edit', this.item._id]);
  }

  getThumbnailUrl(thumb: string): string {
    if (!thumb) return '';
    return thumb.startsWith('http') || thumb.startsWith('/') ? thumb : thumb;
  }
}
