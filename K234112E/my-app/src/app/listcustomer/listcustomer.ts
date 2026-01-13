import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listcustomer',
  standalone: false,
  templateUrl: './listcustomer.html',
  styleUrl: './listcustomer.css',
})
export class Listcustomer {
  customers=[
    {"id":"c1","name":"customer 1","gender":"male","image":"c1.jpg"},
    {"id":"c2","name":"customer 2","gender":"male","image":"c2.jpg"},
    {"id":"c3","name":"customer 3","gender":"female","image":"c3.jpg"},
    {"id":"c4","name":"customer 4","gender":"male","image":"c4.jpg"},
    {"id":"c5","name":"customer 5","gender":"female","image":"c5.jpg"}
  ]
  constructor(private router:Router,private route:ActivatedRoute) 
  {}
  view_detail(id:any)
  {
    this.router.navigate(["list-customer",id]);
  }
}
