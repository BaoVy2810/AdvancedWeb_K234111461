import { Component } from '@angular/core';

@Component({
  selector: 'app-exercise3',
  standalone: false,
  templateUrl: './exercise3.html',
  styleUrl: './exercise3.css',
})
export class Exercise3 {
  // Variable
  myVar: string = 'Hello Angular';

  // Function returns myVar
  getMyVar(): string {
    return this.myVar;
  }
}
