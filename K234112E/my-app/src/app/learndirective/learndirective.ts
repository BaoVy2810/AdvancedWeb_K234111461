import { Component } from '@angular/core';

@Component({
  selector: 'app-learndirective',
  standalone: false,
  templateUrl: './learndirective.html',
  styleUrl: './learndirective.css',
})
export class Learndirective {
  show_view:number=1
  changeView()
  {
    if(this.show_view==1)
      this.show_view=2
    else
      this.show_view=1
  }
  provinces=["Hà Nội", "Huế", "Đà Nẵng", "HCM", "Cần Thơ"]
  products=[{"id":"p1", "name":"Coca", "price":100,  image: '/app/learndirective/images/cocacola.JPG'}, 
            {"id":"p2", "name":"Pepsi", "price":80, image: '/app/learndirective/images/pepsi.JPG'},
            {"id":"p3", "name":"Sting", "price":120, image: '/app/learndirective/images/sting.JPG'}
          ]
}
