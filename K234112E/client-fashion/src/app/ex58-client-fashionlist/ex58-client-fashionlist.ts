import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ClientFashionService, Fashion } from '../client-fashion-service/client-fashion-service';

const NO_IMAGE_DATA_URL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iI2Y0ZjFlYSIvPjx0ZXh0IHg9IjYwIiB5PSI2MCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIGltZzwvdGV4dD48L3N2Zz4=';

@Component({
  selector: 'app-ex58-client-fashionlist',
  standalone: false,
  templateUrl: './ex58-client-fashionlist.html',
  styleUrl: './ex58-client-fashionlist.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class Ex58ClientFashionlist implements OnInit {
  fashions: Fashion[] = [];
  filteredFashions: Fashion[] = [];
  styles: string[] = ['CELEBRITY STYLE', 'TRENDS', 'STREET STYLE'];
  selectedStyle: string = '';
  errorMessage = '';

  constructor(
    private fashionService: ClientFashionService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.fashionService.getFashions().subscribe({
      next: (data) => {
        this.fashions = data;
        this.filteredFashions = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.cdr.detectChanges();
      }
    });
  }

  filterFashions(): void {
    if (this.selectedStyle) {
      this.filteredFashions = this.fashions.filter(f =>
        f.style.toLowerCase().includes(this.selectedStyle.toLowerCase())
      );
    } else {
      this.filteredFashions = [...this.fashions];
    }
    this.cdr.detectChanges();
  }

  viewDetail(id: string): void {
    this.router.navigate(['/fashions', id]);
  }

  getThumbnailSrc(f: Fashion): SafeUrl {
    const url = (f.thumbnail ?? f.fashion_image) || NO_IMAGE_DATA_URL;
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
