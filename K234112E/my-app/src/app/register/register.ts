import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../myservices/auth-service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  username = '';
  password = '';
  confirmPassword = '';
  error = '';
  success = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn.pipe(take(1)).subscribe((loggedIn) => {
      if (loggedIn) this.router.navigate(['/home']);
    });
  }

  onSubmit() {
    this.error = '';
    this.success = '';
    if (this.password !== this.confirmPassword) {
      this.error = 'Password and Confirm Password do not match';
      return;
    }
    this.loading = true;
    this.authService.register(this.username, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.success = 'Registration successful! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'Registration failed. Username may already exist or server not running.';
      }
    });
  }
}
