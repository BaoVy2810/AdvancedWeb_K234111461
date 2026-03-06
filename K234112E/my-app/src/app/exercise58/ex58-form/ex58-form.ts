import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ex58Fashion } from '../ex58-fashion.model';
import { Ex58FashionService } from '../ex58-fashion.service';

@Component({
  selector: 'app-ex58-form',
  standalone: false,
  templateUrl: './ex58-form.html',
  styleUrl: './ex58-form.css',
})
export class Ex58Form {
  model: Partial<Ex58Fashion> = { title: '', details: '', thumbnail: '', style: '' };
  isEdit = false;
  loading = false;
  error = '';
  errorModalMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: Ex58FashionService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isEdit = true;
      this.loadFashion(id);
    }
  }

  loadFashion(id: string): void {
    this.loading = true;
    this.service.getById(id).subscribe({
      next: (data) => {
        this.model = { ...data };
        this.loading = false;
      },
      error: (err) => {
        this.errorModalMessage = err?.message || 'Cannot load fashion.';
        this.loading = false;
      },
    });
  }

  dismissErrorModal(): void {
    this.errorModalMessage = null;
    this.error = '';
  }

  save(): void {
    this.error = '';
    this.errorModalMessage = null;
    if (!this.model.title?.trim()) {
      this.errorModalMessage = 'Title is required.';
      return;
    }
    this.loading = true;
    const body = {
      title: this.model.title,
      details: this.model.details ?? '',
      thumbnail: this.model.thumbnail ?? '',
      style: this.model.style ?? '',
    };
    if (this.isEdit && this.model._id) {
      this.service.update(this.model._id, body).subscribe({
        next: () => this.router.navigate(['/ex58']),
        error: (err) => {
          this.errorModalMessage = err?.message || 'Update failed.';
          this.loading = false;
        },
      });
    } else {
      this.service.add(body).subscribe({
        next: () => this.router.navigate(['/ex58']),
        error: (err) => {
          this.errorModalMessage = err?.message || 'Add failed.';
          this.loading = false;
        },
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/ex58']);
  }
}
