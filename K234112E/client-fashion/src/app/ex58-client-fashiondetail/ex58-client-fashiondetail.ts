import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ClientFashionService, Fashion } from '../client-fashion-service/client-fashion-service';

const NO_IMAGE_DATA_URL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y0ZjFlYSIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gaW1hZ2U8L3RleHQ+PC9zdmc+';

@Component({
  selector: 'app-ex58-client-fashiondetail',
  standalone: false,
  templateUrl: './ex58-client-fashiondetail.html',
  styleUrl: './ex58-client-fashiondetail.css',
  encapsulation: ViewEncapsulation.None
})
export class Ex58ClientFashiondetail implements OnInit {
  fashion: Fashion | null = null;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fashionService: ClientFashionService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fashionService.getFashion(id).subscribe({
        next: (data: Fashion) => {
          const d = data as any;
          this.fashion = {
            ...data,
            fashion_title: data.fashion_title ?? d.title,
            fashion_details: data.fashion_details ?? d.details,
            thumbnail: data.thumbnail ?? data.fashion_image
          };
          this.cdr.detectChanges();
        },
        error: (err: { message: string }) => {
          this.errorMessage = err.message;
          this.cdr.detectChanges();
        }
      });
    }
  }

  getThumbnailSrc(f: Fashion | null): SafeUrl {
    if (!f) return this.sanitizer.bypassSecurityTrustUrl(NO_IMAGE_DATA_URL);
    const url = (f.thumbnail ?? f.fashion_image) || NO_IMAGE_DATA_URL;
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}