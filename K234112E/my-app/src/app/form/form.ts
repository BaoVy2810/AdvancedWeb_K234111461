import { Component } from '@angular/core';
import { Student } from '../classes/student';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  studentModel = new Student("Bảo Vy", "vytnb234112e@st.uel.edu.vn", "0903657297","CSS","toi");
  courses = ["HTML", "CSS", "JavaScript", "Angular", "Ruby"];
  errFlag = false;
  validateCourse(value:any):void{
    if (value === 'none')
      this.errFlag = true;
    else
      this.errFlag = false;
    }
}