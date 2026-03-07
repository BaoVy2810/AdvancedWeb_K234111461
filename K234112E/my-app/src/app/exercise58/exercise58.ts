import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-exercise58',
  standalone: false,
  templateUrl: './exercise58.html',
  styleUrl: './exercise58.css',
})
export class Exercise58 {
  constructor(private router: Router) {}

  goToServer(): void {
    this.router.navigate(['/ex58/server']);
  }

  goToAdmin(): void {
    this.router.navigate(['/ex58/admin']);
  }
}