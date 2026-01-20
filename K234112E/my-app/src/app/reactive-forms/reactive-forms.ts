import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { customValidator, passwordValidator } from './check-validator';

@Component({
  selector: 'app-reactive-forms',
  standalone: false,
  templateUrl: './reactive-forms.html',
  styleUrl: './reactive-forms.css',
})
export class ReactiveForms {
  public regForm: FormGroup; 

  constructor(private _formBuilder: FormBuilder) {
    this.regForm = this._formBuilder.group({
      name: ['',[Validators.required,
        Validators.minLength(3), customValidator(/\@|\#|\$|\%|\^|\&/g)]],
      email: ['vytnb234112e@st.uel.edu.vn'],
      password: ['123456'],
      confirmPassword: ['123456'],
    },
      {validators:[passwordValidator]});
  }

  setDefaultValues() {
    this.regForm.setValue({
      name: 'Bảo Vy',
      email: 'vytnb234112e@st.uel.edu.vn',
      password: '',
      confirmPassword: '',
    });
  }

  patchDefaultValues() {
    this.regForm.patchValue({
      name: 'Bảo Vy',
      email: 'vytnb234112e@st.uel.edu.vn',
    });
  }

  get name(){
    return this.regForm.controls['name'];
  }
}
