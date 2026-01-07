import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contact_name:string="Trần Ngọc Bảo Vy"
  contact_email:string="vytnb234112e@st.uel.edu.vn"
  contact_phone:string="0975957765"
  sendContact(your_name:string):void
  {
    alert("Bạn [" + your_name + "] muốn gửi contact")
  }
}
