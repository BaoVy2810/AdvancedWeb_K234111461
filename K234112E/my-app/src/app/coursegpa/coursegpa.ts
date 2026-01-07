import { Component } from '@angular/core';

@Component({
  selector: 'app-coursegpa',
  standalone: false,
  templateUrl: './coursegpa.html',
  styleUrl: './coursegpa.css',
})
export class CourseGpaComponent {
  ongoingPoint: number = 0;
  midtermPoint: number = 0;
  finaltermPoint: number = 0;

  finalScore: number = 0;
  gpa: number = 0;
  gradeLetter: string = '';

  validatePoint(value: number, field: 'ongoing' | 'midterm' | 'final'): void {
    if (value < 0) {
      value = 0;
    } else if (value > 10) {
      value = 10;
    }
    
    if (field === 'ongoing') {
      this.ongoingPoint = value;
    } else if (field === 'midterm') {
      this.midtermPoint = value;
    } else if (field === 'final') {
      this.finaltermPoint = value;
    }
  }

  calculateGPA() {
    // Tính điểm tổng theo trọng số
    this.finalScore = this.ongoingPoint * 0.3 + this.midtermPoint * 0.2 + this.finaltermPoint * 0.5;

    // Quy đổi sang hệ 4 và điểm chữ
    if (this.finalScore >= 9.0) {
      this.gpa = 4.0; this.gradeLetter = 'A+';
    } else if (this.finalScore >= 8.0) {
      this.gpa = 3.5; this.gradeLetter = 'A';
    } else if (this.finalScore >= 7.0) {
      this.gpa = 3.0; this.gradeLetter = 'B+';
    } else if (this.finalScore >= 6.0) {
      this.gpa = 2.5; this.gradeLetter = 'B';
    } else if (this.finalScore >= 5.0) {
      this.gpa = 2.0; this.gradeLetter = 'C';
    } else if (this.finalScore >= 4.0) {
      this.gpa = 1.5; this.gradeLetter = 'D+';
    } else if (this.finalScore >= 3.0) {
      this.gpa = 1.0; this.gradeLetter = 'D';
    } else {
      this.gpa = 0.0; this.gradeLetter = 'F';
    }
  }
}
