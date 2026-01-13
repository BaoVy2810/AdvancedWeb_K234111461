import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customerdetail',
  standalone: false,
  templateUrl: './customerdetail.html',
  styleUrl: './customerdetail.css',
})
export class Customerdetail {
  customers=[
    {"id":"c1","name":"customer 1","gender":"male","images":"c1.png"},
    {"id":"c2","name":"customer 2","gender":"male","images":"c2.png"},
    {"id":"c3","name":"customer 3","gender":"female","images":"c3.png"},
    {"id":"c4","name":"customer 4","gender":"male","images":"c4.png"},
    {"id":"c5","name":"customer 5","gender":"female","images":"c5.png"},
  ]
  selected_customer:any
constructor(private router:Router,private activeRouter:ActivatedRoute)
  {
  this.activeRouter.paramMap.subscribe(
    (param)=>{
      let id=param.get("id")
      if(id!=null) //lấy được id từ routing nào đó gửi qua
      {
        //sau đó sẽ truy vấn id này trong dataset của mình:
        this.selected_customer=this.customers.find(c=>c.id==id)
      }
    }
  )
  }
  go_back()
  {
    this.router.navigate(["list-customer"]);
  }
}