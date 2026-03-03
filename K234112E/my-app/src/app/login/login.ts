import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../myservices/auth-service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = '';
  password = '';
  error = '';
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
    this.loading = true;
    this.authService.login(this.username, this.password).subscribe({
      next: (success) => {
        this.loading = false;
        if (!success) {
          this.error = 'Invalid username or password';
        }
      },
      error: () => {
        this.loading = false;
        this.error = 'Invalid username or password. Check server is running on port 3002.';
      }
    });
  }
}
